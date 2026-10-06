"use client";

import { FormEvent, useMemo, useState } from "react";
import { ConsentField } from "@/components/consent-field";

const steps = [
  { id: 1, title: "Что хотите разработать?" },
  { id: 2, title: "Какую задачу бизнеса должен решить продукт?" },
  { id: 3, title: "Кто будет пользоваться?" },
  { id: 4, title: "Что обязательно должно быть в первой версии?" },
  { id: 5, title: "Какой бюджет рассматриваете?" },
  { id: 6, title: "Когда нужен запуск?" },
  { id: 7, title: "Куда связаться?" },
] as const;

const productOptions = [
  "Мобильное приложение",
  "CRM / ERP",
  "Личный кабинет / SaaS",
  "Интернет-магазин",
  "Автоматизация",
  "Пока не знаю",
];

const userOptions = ["Клиенты", "Сотрудники", "И те, и другие", "Другое"];

const budgetOptions = [
  "До 200 000 ₽",
  "200–400 тыс. ₽",
  "400–800 тыс. ₽",
  "800 тыс. ₽+",
  "Нужна оценка",
];

const deadlineOptions = [
  "Как можно быстрее",
  "В течение месяца",
  "1–3 месяца",
  "Срок не критичен",
];

type QuizState = {
  product: string;
  goal: string;
  users: string;
  mvp: string;
  budget: string;
  deadline: string;
  name: string;
  contact: string;
  company: string;
  examples: string;
  website: string;
  consent: boolean;
};

const initialState: QuizState = {
  product: "",
  goal: "",
  users: "",
  mvp: "",
  budget: "",
  deadline: "",
  name: "",
  contact: "",
  company: "",
  examples: "",
  website: "",
  consent: false,
};

function isStepValid(step: number, values: QuizState) {
  switch (step) {
    case 0:
      return Boolean(values.product);
    case 1:
      return values.goal.trim().length > 0;
    case 2:
      return Boolean(values.users);
    case 3:
      return values.mvp.trim().length > 0;
    case 4:
      return Boolean(values.budget);
    case 5:
      return Boolean(values.deadline);
    case 6:
      return (
        values.name.trim().length > 0 &&
        values.contact.trim().length > 0 &&
        values.consent
      );
    default:
      return false;
  }
}

export function QuizForm() {
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState<QuizState>(initialState);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const lastStep = steps.length - 1;

  const progress = useMemo(
    () => ((current + 1) / steps.length) * 100,
    [current],
  );

  function update<K extends keyof QuizState>(key: K, value: QuizState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function stepError(step: number) {
    if (
      step === lastStep &&
      values.name.trim() &&
      values.contact.trim() &&
      !values.consent
    ) {
      return "Нужно согласие на обработку персональных данных.";
    }

    if (!isStepValid(step, values)) {
      return "Ответьте на вопрос, чтобы продолжить.";
    }

    return "";
  }

  function next() {
    const message = stepError(current);
    if (message) {
      setError(message);
      return;
    }

    setError("");
    setCurrent((step) => Math.min(step + 1, lastStep));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = stepError(current);
    if (message) {
      setError(message);
      return;
    }

    setPending(true);
    setError("");
    setStatus("");

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Не удалось отправить бриф.");
      }

      setStatus(data.message || "Бриф отправлен. Мы свяжемся с вами.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось отправить бриф.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="quiz-card" onSubmit={onSubmit} noValidate>
      <div className="progress" aria-hidden="true">
        <i style={{ width: `${progress}%` }} />
      </div>
      <div>
        {current === 0 && (
          <div className="qstep">
            <small>1 / 7</small>
            <h3>{steps[0].title}</h3>
            <div className="options">
              {productOptions.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="product"
                    value={option}
                    checked={values.product === option}
                    onChange={() => update("product", option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {current === 1 && (
          <div className="qstep">
            <small>2 / 7</small>
            <h3>{steps[1].title}</h3>
            <textarea
              name="goal"
              value={values.goal}
              onChange={(event) => update("goal", event.target.value)}
              placeholder="Например: автоматизировать заявки, запустить сервис для клиентов..."
            />
          </div>
        )}
        {current === 2 && (
          <div className="qstep">
            <small>3 / 7</small>
            <h3>{steps[2].title}</h3>
            <div className="options">
              {userOptions.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="users"
                    value={option}
                    checked={values.users === option}
                    onChange={() => update("users", option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {current === 3 && (
          <div className="qstep">
            <small>4 / 7</small>
            <h3>{steps[3].title}</h3>
            <textarea
              name="mvp"
              value={values.mvp}
              onChange={(event) => update("mvp", event.target.value)}
              placeholder="Перечислите основные функции. Можно коротко."
            />
          </div>
        )}
        {current === 4 && (
          <div className="qstep">
            <small>5 / 7</small>
            <h3>{steps[4].title}</h3>
            <div className="options">
              {budgetOptions.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="budget"
                    value={option}
                    checked={values.budget === option}
                    onChange={() => update("budget", option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {current === 5 && (
          <div className="qstep">
            <small>6 / 7</small>
            <h3>{steps[5].title}</h3>
            <div className="options">
              {deadlineOptions.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="deadline"
                    value={option}
                    checked={values.deadline === option}
                    onChange={() => update("deadline", option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {current === 6 && (
          <div className="qstep">
            <small>7 / 7</small>
            <h3>{steps[6].title}</h3>
            <div className="grid2">
              <input
                name="name"
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Ваше имя"
                autoComplete="name"
              />
              <input
                name="contact"
                value={values.contact}
                onChange={(event) => update("contact", event.target.value)}
                placeholder="Телефон / Telegram / Email"
                autoComplete="tel"
              />
            </div>
            <input
              name="company"
              value={values.company}
              onChange={(event) => update("company", event.target.value)}
              placeholder="Компания (необязательно)"
              autoComplete="organization"
            />
            <textarea
              name="examples"
              value={values.examples}
              onChange={(event) => update("examples", event.target.value)}
              placeholder="Ссылки на примеры / аналоги (необязательно)"
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
            <ConsentField
              checked={values.consent}
              onChange={(value) => update("consent", value)}
            />
          </div>
        )}
      </div>
      <div className="quiz-actions">
        <button
          type="button"
          className="btn ghost dark"
          onClick={() => setCurrent((step) => Math.max(step - 1, 0))}
          style={{ visibility: current === 0 ? "hidden" : "visible" }}
        >
          Назад
        </button>
        {current < lastStep ? (
          <button type="button" className="btn" onClick={next}>
            Далее
          </button>
        ) : (
          <button className="btn" type="submit" disabled={pending}>
            {pending ? "Отправляем..." : "Отправить бриф"}
          </button>
        )}
      </div>
      {error ? <p className="form-error">{error}</p> : null}
      {status ? (
        <p className="form-status" role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
