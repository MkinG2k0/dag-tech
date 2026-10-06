"use client";

import { FormEvent, useState } from "react";

type ContactState = {
  name: string;
  contact: string;
  message: string;
  website: string;
};

const initialState: ContactState = {
  name: "",
  contact: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactState>(initialState);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function update<K extends keyof ContactState>(key: K, value: ContactState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.name.trim() || !values.contact.trim() || !values.message.trim()) {
      setError("Заполните имя, контакт и описание задачи.");
      return;
    }

    setPending(true);
    setError("");
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Не удалось отправить заявку.");
      }

      setStatus(data.message || "Заявка отправлена. Мы свяжемся с вами.");
      setValues(initialState);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось отправить заявку.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="grid2">
        <input
          name="name"
          required
          placeholder="Ваше имя"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
        />
        <input
          name="contact"
          required
          placeholder="Телефон / Telegram / Email"
          autoComplete="tel"
          value={values.contact}
          onChange={(event) => update("contact", event.target.value)}
        />
      </div>
      <textarea
        name="message"
        required
        placeholder="Что хотите разработать?"
        value={values.message}
        onChange={(event) => update("message", event.target.value)}
      />
      <label className="honeypot">
        Сайт
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </label>
      <button className="btn" type="submit" disabled={pending}>
        {pending ? "Отправляем..." : "Отправить заявку"}
      </button>
      {status ? (
        <span className="form-status" role="status">
          {status}
        </span>
      ) : null}
      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
