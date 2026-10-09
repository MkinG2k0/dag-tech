export type ProjectShot = {
  src: string;
  alt: string;
  kind: "phone" | "desktop";
};

export type Project = {
  id: string;
  tag: string;
  title: string;
  summary: string;
  description: string;
  cover?: string;
  coverPosition?: string;
  shots: ProjectShot[];
  href?: string;
  hrefLabel?: string;
};

export function projectPath(id: string) {
  return `/projects/${id}`;
}

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function getProjectSeo(project: Project) {
  return {
    title: `${project.title} — кейс`,
    description: project.summary,
    path: projectPath(project.id),
  };
}

export const projects: Project[] = [
  {
    id: "diary",
    tag: "Web / SaaS",
    title: "Дневник медресе",
    summary:
      "Закрытый дневник школы: группы, посещаемость, оценки и аналитика.",
    description:
      "Онлайн-дневник для медресе: группы, посещаемость, оценки, задания и роли. Администрация видит всю школу, учитель — свой класс, опекун — своего ребёнка. Аналитика по успеваемости собирается в одном экране, без таблиц в мессенджере.",
    cover: "/projects/diary-journal.webp",
    coverPosition: "center top",
    shots: [
      {
        src: "/projects/diary-journal.webp",
        alt: "Журнал урока: посещаемость, шаги и оценки",
        kind: "desktop",
      },
      {
        src: "/projects/diary-history.webp",
        alt: "История шагов ученика с оценками",
        kind: "desktop",
      },
      {
        src: "/projects/diary-my-group.webp",
        alt: "Группа учителя: уровень и текущий шаг",
        kind: "desktop",
      },
      {
        src: "/projects/diary-analytics.webp",
        alt: "Аналитика успеваемости в дневнике медресе",
        kind: "desktop",
      },
      {
        src: "/projects/diary-groups.webp",
        alt: "Список учебных групп",
        kind: "desktop",
      },
      {
        src: "/projects/diary-assignments.webp",
        alt: "Дополнительные задания",
        kind: "desktop",
      },
      {
        src: "/projects/diary-program.webp",
        alt: "Программа предмета: уровни и шаги",
        kind: "desktop",
      },
      {
        src: "/projects/diary-awards.webp",
        alt: "Награды учеников",
        kind: "desktop",
      },
      {
        src: "/projects/diary-teachers.webp",
        alt: "Аналитика учителей",
        kind: "desktop",
      },
      {
        src: "/projects/diary-calendar.webp",
        alt: "Календарь отпусков преподавателей",
        kind: "desktop",
      },
      {
        src: "/projects/diary-login.webp",
        alt: "Экран входа в дневник",
        kind: "desktop",
      },
    ],
  },
  {
    id: "ai-food",
    tag: "Android / AI",
    title: "AI Food",
    summary: "Учёт калорий и БЖУ по фото — нейросеть считает за секунды.",
    description:
      "Сфотографировали тарелку — искусственный интеллект оценивает калории, белки, жиры и углеводы и сохраняет приём в дневник. Без ручного взвешивания и длинных справочников: быстрый учёт питания прямо с камеры телефона.",
    cover: "/projects/ai-food.webp",
    coverPosition: "center 18%",
    shots: [
      {
        src: "/projects/ai-food-1.webp",
        alt: "Промо AI Food: фото еды и подсчёт КБЖУ",
        kind: "phone",
      },
      {
        src: "/projects/ai-food-2.webp",
        alt: "Дневник питания AI Food",
        kind: "phone",
      },
      {
        src: "/projects/ai-food-3.webp",
        alt: "Разбор блюда по фото",
        kind: "phone",
      },
      {
        src: "/projects/ai-food-4.webp",
        alt: "Экран калорий и БЖУ",
        kind: "phone",
      },
      {
        src: "/projects/ai-food-5.webp",
        alt: "Отчёты по питанию за 7 дней",
        kind: "phone",
      },
      {
        src: "/projects/ai-food-6.webp",
        alt: "Друзья и настройки AI Food",
        kind: "phone",
      },
    ],
    href: "https://www.rustore.ru/catalog/app/com.aifood.app",
    hrefLabel: "Открыть в RuStore →",
  },
  {
    id: "ai-fit",
    tag: "Android / Fitness",
    title: "Подход",
    summary: "Силовой дневник: вес, повторы, прогресс. Данные на устройстве.",
    description:
      "Дневник силовых тренировок без облака и аккаунта. Подходы, вес, повторы, графики прогресса и таймер отдыха. История упражнений остаётся на телефоне — можно тренироваться офлайн и не раздавать данные сервисам.",
    cover: "/projects/ai-fit.webp",
    coverPosition: "center 16%",
    shots: [
      {
        src: "/projects/ai-fit-1.webp",
        alt: "Промо приложения Подход: тренировка с подходами",
        kind: "phone",
      },
      {
        src: "/projects/ai-fit-2.webp",
        alt: "Список тренировок",
        kind: "phone",
      },
      {
        src: "/projects/ai-fit-3.webp",
        alt: "Ввод подходов и веса",
        kind: "phone",
      },
      {
        src: "/projects/ai-fit-4.webp",
        alt: "График прогресса",
        kind: "phone",
      },
      {
        src: "/projects/ai-fit-5.webp",
        alt: "Пресеты и каталог упражнений",
        kind: "phone",
      },
      {
        src: "/projects/ai-fit-6.webp",
        alt: "Неделя тренировок и история",
        kind: "phone",
      },
    ],
    href: "https://www.rustore.ru/catalog/app/com.aifit.fit",
    hrefLabel: "Открыть в RuStore →",
  },
  {
    id: "voiceride",
    tag: "Android / Offline",
    title: "VoiceRide Camera",
    summary: "Камера для шлема: старт, стоп и фото — голосом, без сети.",
    description:
      "Камера для мотошлема с голосовым управлением. Старт записи, стоп и фото — голосом, без интернета и без аккаунта. Руки остаются на руле: приложение слушает команды локально и пишет видео на устройство.",
    cover: "/projects/voiceride.webp",
    coverPosition: "center 14%",
    shots: [
      {
        src: "/projects/voiceride-1.webp",
        alt: "Промо VoiceRide: голос и руки на руле",
        kind: "phone",
      },
      {
        src: "/projects/voiceride-2.webp",
        alt: "Голосовое управление камерой",
        kind: "phone",
      },
      {
        src: "/projects/voiceride-3.webp",
        alt: "Экран записи на шлеме",
        kind: "phone",
      },
      {
        src: "/projects/voiceride-4.webp",
        alt: "Команды старт и фото",
        kind: "phone",
      },
      {
        src: "/projects/voiceride-5.webp",
        alt: "Записи поездок без облака",
        kind: "phone",
      },
    ],
    href: "https://www.rustore.ru/catalog/app/ru.mk.voiceride",
    hrefLabel: "Открыть в RuStore →",
  },
  {
    id: "ajera",
    tag: "Web / E-commerce",
    title: "Ajerramoto",
    summary: "Каталог эндуро-мотоциклов: модели, цены, дилеры и заявка.",
    description:
      "Сайт бренда эндуро AJERRA: витрина моделей от новичка до соревнований, цены, запчасти, дилеры и заявка на байк. Тёмная витрина с акцентом на технику — клиент выбирает модель и сразу оставляет заявку или звонит.",
    cover: "/projects/ajera-1.webp",
    coverPosition: "center top",
    shots: [
      {
        src: "/projects/ajera-1.webp",
        alt: "Главный экран Ajerramoto",
        kind: "desktop",
      },
      {
        src: "/projects/ajera-2.webp",
        alt: "Каталог эндуро-мотоциклов",
        kind: "desktop",
      },
      {
        src: "/projects/ajera-3.webp",
        alt: "Карточки моделей и цены",
        kind: "desktop",
      },
    ],
    href: "https://ajera.vercel.app/",
    hrefLabel: "Открыть проект →",
  },
  {
    id: "develop",
    tag: "Web / Studio",
    title: "Develop",
    summary: "Лендинг студии: сайты под ключ, пакеты, сроки и заявка.",
    description:
      "Посадочная студии веб-разработки: лендинги, бизнес-сайты и веб-приложения под ключ. На одном экране — форматы, сроки, цены, портфолио и заявка, чтобы клиент понял объём работ до созвона.",
    cover: "/projects/develop-1.webp",
    coverPosition: "center top",
    shots: [
      {
        src: "/projects/develop-1.webp",
        alt: "Главный экран лендинга Develop",
        kind: "desktop",
      },
      {
        src: "/projects/develop-2.webp",
        alt: "Форматы: лендинг, бизнес-сайт и веб-приложение",
        kind: "desktop",
      },
      {
        src: "/projects/develop-3.webp",
        alt: "Пакеты и цены Develop",
        kind: "desktop",
      },
      {
        src: "/projects/develop-4.webp",
        alt: "Пять шагов от идеи до запуска",
        kind: "desktop",
      },
    ],
    href: "https://develop-kappa-henna.vercel.app/",
    hrefLabel: "Открыть проект →",
  },
  {
    id: "clickmate",
    tag: "Windows / Android",
    title: "ClickMate",
    summary: "Телефон как пульт для Windows: тачпад, клавиатура, медиа.",
    description:
      "Телефон становится пультом для Windows: тачпад, клики, клавиатура и управление музыкой по локальной Wi‑Fi сети. Без аккаунта, облака и проводов — команды идут напрямую между ПК и телефоном, данные остаются дома.",
    cover: "/projects/clickmate-1.webp",
    coverPosition: "center top",
    shots: [
      {
        src: "/projects/clickmate-1.webp",
        alt: "Главный экран ClickMate",
        kind: "desktop",
      },
      {
        src: "/projects/clickmate-2.webp",
        alt: "Режимы тачпада ClickMate",
        kind: "desktop",
      },
      {
        src: "/projects/clickmate-3.webp",
        alt: "Подключение телефона к Windows",
        kind: "desktop",
      },
    ],
    href: "https://clickmate-site.vercel.app/",
    hrefLabel: "Открыть проект →",
  },
];
