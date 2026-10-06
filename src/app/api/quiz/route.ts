import { NextResponse } from "next/server";
import { deliverLead, hasConsent, parseJsonBody, readString } from "@/lib/leads";

export const maxDuration = 20;

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);

    if (readString(body, "website")) {
      return NextResponse.json({ message: "Бриф отправлен. Мы свяжемся с вами." });
    }

    const fields = {
      product: readString(body, "product"),
      goal: readString(body, "goal"),
      users: readString(body, "users"),
      mvp: readString(body, "mvp"),
      budget: readString(body, "budget"),
      deadline: readString(body, "deadline"),
      name: readString(body, "name"),
      contact: readString(body, "contact"),
      company: readString(body, "company"),
      examples: readString(body, "examples"),
    };

    if (
      !fields.product ||
      !fields.goal ||
      !fields.users ||
      !fields.mvp ||
      !fields.budget ||
      !fields.deadline ||
      !fields.name ||
      !fields.contact
    ) {
      return NextResponse.json(
        { message: "Заполните обязательные поля брифа." },
        { status: 400 },
      );
    }

    if (!hasConsent(body)) {
      return NextResponse.json(
        { message: "Нужно согласие на обработку персональных данных." },
        { status: 400 },
      );
    }

    const result = await deliverLead("Новый бриф с сайта DAG TECH", fields);
    return NextResponse.json({
      ...result,
      message: "Бриф отправлен. Мы свяжемся с вами.",
    });
  } catch {
    return NextResponse.json(
      { message: "Не удалось отправить бриф." },
      { status: 500 },
    );
  }
}
