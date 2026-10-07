import { ContactForm } from "@/components/contact-form";
import { HeroLens } from "@/components/hero-lens";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import { QuizForm } from "@/components/quiz-form";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

const services = [
  {
    icon: "↗",
    title: "Мобильные приложения",
    text: "iOS и Android: клиентские сервисы, запись, программы лояльности, подписки и push.",
  },
  {
    icon: "⌘",
    title: "CRM и внутренние системы",
    text: "Продажи, сотрудники, статусы, документы, отчёты и автоматизация ручных процессов.",
  },
  {
    icon: "◫",
    title: "Личные кабинеты и SaaS",
    text: "Роли, тарифы, биллинг, панели управления, интеграции и масштабируемая архитектура.",
  },
  {
    icon: "⚡",
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
          <HeroLens />
          <div className="hero-copy">
            <p className="eyebrow">Разработка ПО для бизнеса</p>
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
            <div className="stats glass">
              <div>
                <b>от 200 000 ₽</b>
                <span>старт проекта</span>
              </div>
              <div>
                <b>2–4 недели</b>
                <span>типичный MVP</span>
              </div>
              <div>
                <b>под ключ</b>
                <span>до рабочего запуска</span>
              </div>
            </div>
          </div>
          <div className="hero-panel" aria-hidden="true">
            <div className="window">
              <div className="window-top">
                <i />
                <i />
                <i />
                <small>product.launch</small>
              </div>
              <div className="code-card">
                <span>01</span>
                <div>
                  <b>Задача бизнеса</b>
                  <p>Разбираем, что должен изменить продукт.</p>
                </div>
              </div>
              <div className="code-card active">
                <span>02</span>
                <div>
                  <b>MVP и архитектура</b>
                  <p>Оставляем главное для быстрого запуска.</p>
                </div>
              </div>
              <div className="code-card">
                <span>03</span>
                <div>
                  <b>Разработка</b>
                  <p>Интерфейс, сервер, интеграции.</p>
                </div>
              </div>
              <div className="launch">
                Готово к запуску <strong>→</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="strip" aria-label="Направления разработки">
          <div className="strip-track">
            {[0, 1].map((copy) => (
              <div
                className="strip-group"
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
              >
                <span>Mobile</span>
                <span>CRM / ERP</span>
                <span>SaaS</span>
                <span>Telegram Mini Apps</span>
                <span>E-commerce</span>
                <span>Automation</span>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Что мы делаем</p>
              <h2>Собираем продукт целиком</h2>
            </div>
            <p>
              Подбираем технологию под бизнес. Не заставляем клиента собирать
              отдельно дизайнера, frontend, backend и DevOps.
            </p>
          </div>
          <div className="cards">
            {services.map((service) => (
              <article className="glass" key={service.title}>
                <div className="icon" aria-hidden="true">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="solutions" className="section solutions">
          <div className="section-head">
            <div>
              <p className="eyebrow">Наши решения</p>
              <h2>То, что уже работает</h2>
            </div>
            <p>
              Приложения, магазины и сервисы в работе. Нажмите карточку —
              внутри описание, скриншоты и ссылка на продукт.
            </p>
          </div>
          <Projects projects={projects} />
        </section>

        <section id="process" className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Процесс</p>
              <h2>Без квеста из подрядчиков</h2>
            </div>
          </div>
          <div className="timeline">
            {process.map((item) => (
              <div className="glass" key={item.n}>
                <b>{item.n}</b>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="quiz" className="section quiz-section">
          <div className="quiz-intro">
            <p className="eyebrow">Бриф за 2 минуты</p>
            <h2>Расскажите о проекте</h2>
            <p>
              Ответьте на несколько вопросов. Мы получим готовый мини-бриф и
              сможем быстрее понять задачу до созвона.
            </p>
            <div className="quiz-benefit glass">
              <b>После отправки</b>
              <span>получим бриф и ответим в течение дня.</span>
            </div>
          </div>
          <QuizForm />
        </section>

        <section id="contact" className="section contact">
          <div>
            <p className="eyebrow">Есть задача?</p>
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
                <small>Номер для связи</small>
                {siteConfig.phone.display}
              </a>
              <a
                className="contact-phone contact-mail"
                href={siteConfig.email.href}
              >
                <small>Почта</small>
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
