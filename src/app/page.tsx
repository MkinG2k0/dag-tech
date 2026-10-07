import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { QuizForm } from "@/components/quiz-form";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

const services = [
  {
    title: "Мобильные приложения",
    text: "iOS и Android: клиентские сервисы, запись, программы лояльности, подписки и push.",
  },
  {
    title: "CRM и внутренние системы",
    text: "Продажи, сотрудники, статусы, документы, отчёты и автоматизация ручных процессов.",
  },
  {
    title: "Личные кабинеты и SaaS",
    text: "Роли, тарифы, биллинг, панели управления, интеграции и масштабируемая архитектура.",
  },
  {
    title: "Интеграции и автоматизация",
    text: "Оплаты, уведомления, API, карты, внешние сервисы и бизнес-процессы.",
  },
];

const process = [
  {
    n: "01",
    title: "Разбираем задачу",
    text: "Цели, пользователи, функции и ограничения.",
  },
  {
    n: "02",
    title: "Оцениваем",
    text: "Предлагаем MVP, сроки и стоимость.",
  },
  {
    n: "03",
    title: "Разрабатываем",
    text: "Дизайн, frontend, backend и интеграции.",
  },
  {
    n: "04",
    title: "Запускаем",
    text: "Тестируем, разворачиваем и публикуем.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        К содержанию
      </a>
      <Header />
      <main id="top">
        <section className="hero" id="main">
          <ShaderAnimation className="shader-field" />
          <div className="hero-copy">
            <h1>
              Цифровые продукты <span>без&nbsp;лишнего шума</span>
            </h1>
            <p>
              DAG TECH проектирует и запускает софт, который решает конкретную
              задачу бизнеса. От первого экрана до backend, интеграций и
              публикации.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#quiz">
                Рассчитать проект
              </a>
              <a className="btn ghost" href="#solutions">
                Посмотреть решения
              </a>
            </div>
            <p className="hero-facts">
              от 200 000 ₽ старт проекта · 2–4 недели типичный MVP · под ключ до
              рабочего запуска
            </p>
          </div>
        </section>

        <section className="strip" aria-label="Направления разработки">
          <span>Мобильные приложения</span>
          <span>CRM</span>
          <span>Личные кабинеты</span>
          <span>Telegram</span>
          <span>Магазины</span>
          <span>Автоматизация</span>
        </section>

        <section id="services" className="section">
          <div className="section-head">
            <h2>Собираем продукт целиком</h2>
            <p>
              Подбираем технологию под бизнес. Не заставляем клиента собирать
              отдельно дизайнера, frontend, backend и DevOps.
            </p>
          </div>
          <div className="index">
            {services.map((service) => (
              <article key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="solutions" className="section solutions">
          <div className="section-head">
            <h2>То, что уже работает</h2>
            <p>
              Приложения, магазины и сервисы в работе. Нажмите карточку —
              внутри описание, скриншоты и ссылка на продукт.
            </p>
          </div>
          <Projects projects={projects} />
        </section>

        <section id="process" className="section">
          <div className="section-head">
            <h2>Без квеста из подрядчиков</h2>
          </div>
          <div className="timeline">
            {process.map((item) => (
              <div key={item.n}>
                <b>{item.n}</b>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="quiz" className="section quiz-section">
          <div className="quiz-intro">
            <h2>Расскажите о проекте</h2>
            <p>
              Ответьте на несколько вопросов. Мы получим готовый мини-бриф и
              сможем быстрее понять задачу до созвона.
            </p>
            <p className="quiz-benefit">
              <b>После отправки</b>
              <span>получим бриф и ответим в течение дня.</span>
            </p>
          </div>
          <QuizForm />
        </section>

        <section id="contact" className="section contact">
          <div>
            <h2>Обсудим проект</h2>
            <p>
              Опишите идею в двух словах. Свяжемся, уточним детали и предложим
              оптимальный формат запуска.
            </p>
            <div className="contact-channels">
              <a
                className="contact-phone"
                href={siteConfig.phone.href}
                aria-label={`Позвонить ${siteConfig.phone.display}`}
              >
                {siteConfig.phone.display}
              </a>
              <a
                className="contact-phone contact-mail"
                href={siteConfig.email.href}
                aria-label={`Написать на ${siteConfig.email.display}`}
              >
                {siteConfig.email.display}
              </a>
              <p className="contact-geo">
                {siteConfig.geo.display}
                <span>{siteConfig.geo.served}</span>
              </p>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
