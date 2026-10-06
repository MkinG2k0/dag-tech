type LeadPayload = Record<string, unknown>;

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "dagtech.studio@gmail.com";

const FIELD_LABELS: Record<string, string> = {
  name: "Имя",
  contact: "Контакт",
  message: "Сообщение",
  product: "Продукт",
  goal: "Задача бизнеса",
  users: "Пользователи",
  mvp: "Первая версия",
  budget: "Бюджет",
  deadline: "Срок",
  company: "Компания",
  examples: "Примеры",
};

function isRecord(value: unknown): value is LeadPayload {
  return typeof value === "object" && value !== null;
}

export function readString(data: LeadPayload, key: string) {
  const value = data[key];
  return typeof value === "string" ? value.trim() : "";
}

export async function parseJsonBody(request: Request) {
  const body = await request.json();

  if (!isRecord(body)) {
    throw new Error("Некорректные данные формы.");
  }

  return body;
}

function filledFields(fields: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value.length > 0),
  );
}

function formatText(subject: string, fields: Record<string, string>) {
  const lines = Object.entries(fields).map(
    ([key, value]) => `${FIELD_LABELS[key] ?? key}: ${value}`,
  );

  return [subject, "", ...lines].join("\n");
}

function formatHtml(subject: string, fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #111;font-weight:700">${escapeHtml(
          FIELD_LABELS[key] ?? key,
        )}</td><td style="padding:8px 12px;border:1px solid #111;white-space:pre-wrap">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  return `<div style="font-family:Arial,sans-serif;color:#111">
    <h2>${escapeHtml(subject)}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table>
  </div>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function sendViaResend(subject: string, fields: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return false;
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "DAG TECH <onboarding@resend.dev>";
  const replyTo = fields.contact?.includes("@") ? fields.contact : undefined;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_EMAIL],
      subject,
      html: formatHtml(subject, fields),
      text: formatText(subject, fields),
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    console.error("[lead:resend]", response.status, await response.text());
    return false;
  }

  return true;
}

async function sendViaInbox(subject: string, fields: Record<string, string>) {
  const replyTo = fields.contact?.includes("@") ? fields.contact : undefined;
  const payload: Record<string, string> = {
    _subject: subject,
    _template: "table",
    _captcha: "false",
    ...Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [
        FIELD_LABELS[key] ?? key,
        value,
      ]),
    ),
  };

  if (replyTo) {
    payload._replyto = replyTo;
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    console.error("[lead:email]", response.status, await response.text());
    throw new Error("Не удалось отправить заявку на почту.");
  }

  return true;
}

async function sendViaWebhook(subject: string, fields: Record<string, string>) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    return;
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject,
      fields,
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    console.error("[lead:webhook]", response.status, await response.text());
  }
}

export async function deliverLead(
  subject: string,
  fields: Record<string, string>,
) {
  const payload = filledFields(fields);
  const emailed =
    (await sendViaResend(subject, payload)) ||
    (await sendViaInbox(subject, payload));

  await sendViaWebhook(subject, payload);

  if (!emailed) {
    throw new Error("Не удалось отправить заявку на почту.");
  }

  return {
    delivered: true,
    message: "Заявка отправлена. Мы свяжемся с вами.",
  };
}
