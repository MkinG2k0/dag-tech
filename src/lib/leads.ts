type LeadPayload = Record<string, unknown>;

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

export async function deliverLead(subject: string, fields: Record<string, string>) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    console.info("[lead]", subject, fields);
    return {
      delivered: false,
      message: "Заявка принята. Подключите CONTACT_WEBHOOK_URL, чтобы получать брифы.",
    };
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
    throw new Error("Не удалось доставить заявку.");
  }

  return {
    delivered: true,
    message: "Заявка отправлена. Мы свяжемся с вами.",
  };
}
