import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { QuizForm } from "@/components/quiz-form";
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

const projects = [
  {
    featured: true,
    tag: "Web / SaaS",
    title: "Дневник медресе",
    text: "Закрытый онлайн-дневник школы: группы, посещаемость, оценки, аналитика и роли для администрации, учителей и опекунов.",
    image: "/projects/diary-analytics.webp",
    imagePosition: "center top",
  },
  {
    featured: false,
    tag: "Android / AI",
    title: "AI Food",
    text: "Учёт питания по фото: искусственный интеллект оценивает калории и БЖУ и сохраняет приём в дневник.",
    image: "/projects/ai-food.webp",
    imagePosition: "center 18%",
    href: "https://www.rustore.ru/catalog/app/com.aifood.app",
    hrefLabel: "Открыть в RuStore →",
  },
  {
    featured: false,
    tag: "Android / Fitness",
    title: "Подход",
    text: "Дневник силовых тренировок: подходы, вес, повторы, графики прогресса и таймер отдыха. Данные остаются на устройстве.",
    image: "/projects/ai-fit.webp",
    imagePosition: "center 20%",
    href: "https://www.rustore.ru/catalog/app/com.aifit.fit",
    hrefLabel: "Открыть в RuStore →",
  },
  {
    featured: false,
    tag: "Android / Offline",
    title: "VoiceRide Camera",
    text: "Камера для мотошлема с голосовым управлением. Старт, стоп и фото — голосом, без интернета и без аккаунта.",
    image: "/projects/voiceride.webp",
    imagePosition: "center 22%",
    href: "https://www.rustore.ru/catalog/app/ru.mk.voiceride",
    hrefLabel: "Открыть в RuStore →",
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
          <div className="hero-copy">
            <p className="eyebrow">Разработка ПО для бизнеса</p>
            <h1>
              Цифровые продукты <span>без лишнего шума</span>
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
            <div className="stats">
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
          <span>Mobile</span>
          <span>CRM / ERP</span>
          <span>SaaS</span>
          <span>Telegram Mini Apps</span>
          <span>E-commerce</span>
          <span>Automation</span>
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
              <article key={service.title}>
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
              Мобильные приложения в RuStore и закрытый школьный дневник —
              продукты, которые уже пользуются.
            </p>
          </div>
          <div className="projects">
            {projects.map((project) => (
              <article
                className={project.featured ? "project featured" : "project"}
                key={project.title}
              >
                <div className="mock">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={
                      project.featured
                        ? "(max-width: 900px) 100vw, 1200px"
                        : "(max-width: 900px) 100vw, 33vw"
                    }
                    preload={project.featured}
                    style={{
                      objectFit: "cover",
                      objectPosition: project.imagePosition,
                    }}
                  />
                </div>
                <div className="project-copy">
                  <small>{project.tag}</small>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.hrefLabel}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
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
            <p className="eyebrow">Бриф за 2 минуты</p>
            <h2>Расскажите о проекте</h2>
            <p>
              Ответьте на несколько вопросов. Мы получим готовый мини-бриф и
              сможем быстрее понять задачу до созвона.
            </p>
            <div className="quiz-benefit">
              <b>После отправки</b>
              <span>
                заявка и все ответы придут на вашу почту через сервер сайта.
              </span>
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
            <a
              className="contact-phone"
              href={siteConfig.phone.href}
              aria-label={`Позвонить ${siteConfig.phone.display}`}
            >
              <small>Номер для связи</small>
              {siteConfig.phone.display}
            </a>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
