import { NextResponse } from "next/server";
import { deliverLead, parseJsonBody, readString } from "@/lib/leads";

export const maxDuration = 20;

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);

    if (readString(body, "website")) {
      return NextResponse.json({ message: "Заявка отправлена. Мы свяжемся с вами." });
    }

    const name = readString(body, "name");
    const contact = readString(body, "contact");
    const message = readString(body, "message");

    if (!name || !contact || !message) {
      return NextResponse.json(
        { message: "Заполните имя, контакт и описание задачи." },
        { status: 400 },
      );
    }

    const result = await deliverLead("Новая заявка с сайта DAG TECH", {
      name,
      contact,
      message,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: "Не удалось отправить заявку." },
      { status: 500 },
    );
  }
}
