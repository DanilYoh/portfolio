import { Fragment } from "react";

const assets = {
  brandMark: "/assets/logo-mark.png",
  brandWordmark: "/assets/logo-ie.svg",
  mail: "/assets/mail.svg",
  mailHeader: "/assets/mail-header.svg",
  whatsapp: "/assets/whatsapp.svg",
  telegram: "/assets/telegram.svg",
  code: "/assets/service-code.svg",
  window: "/assets/service-window.svg",
  component: "/assets/service-component.svg",
  dot: "/assets/step-dot.svg",
  chevronRight: "/assets/chevron-right.svg",
  chevronDown: "/assets/chevron-down.svg",
  pipeline: "/assets/hero-code.png",
  terminal: "/assets/hero-terminal.png",
  design: "/assets/hero-design.png",
} as const;

const stages = [
  "Исследование",
  "Аналитика",
  "Дизайн",
  "Разработка",
  "Тестирование",
  "Релиз",
];

const projects = [
  {
    title: "Startup Zone",
    description:
      "Маркетплейс помогает презентовать свои стартапы, а инвесторам находить проекты и отправлять заявки на сделки",
  },
  {
    title: "Exchange",
    description:
      "Приложение для быстрых переводов и обмена фиата или криптовалюты со встроенным KYC для моментальной проверки документов",
  },
  {
    title: "Система заявок в службу поддержки",
    description:
      "Система обращений в поддержку объединяет создание заявок клиентами, разбор пула агентами и администрирование через CRUD",
  },
  {
    title: "Интеграция 1С",
    description:
      "Модуль интеграции 1С связывает документы по договорам в одном окне, автоматически формирует счета и напоминает о платежах",
  },
  {
    title: "WorkChat",
    description:
      "Единая платформа объединяет корпоративные чаты, файловое хранилище и решение организационных задач в одном интерфейсе",
  },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="iE — на главную">
      <span className="brand__mark" aria-hidden="true">
        <img src={assets.brandMark} alt="" />
      </span>
      <img className="brand__wordmark" src={assets.brandWordmark} alt="" />
    </a>
  );
}

function MessengerLinks() {
  return (
    <>
      <a
        className="messenger messenger--whatsapp"
        href="https://wa.me/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={assets.whatsapp} alt="" />
        <span>WhatsApp</span>
      </a>
      <a
        className="messenger messenger--telegram"
        href="https://t.me/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={assets.telegram} alt="" />
        <span>Telegram</span>
      </a>
    </>
  );
}

function Header() {
  return (
    <header className="site-header layout-shell">
      <div className="site-header__left">
        <Brand />
        <nav className="site-nav" aria-label="Основная навигация">
          <a className="nav-link" href="#projects">
            Проекты
          </a>
        </nav>
      </div>
      <div className="site-header__actions">
        <button className="language" type="button" aria-label="Выбран русский язык">
          <span>RU</span>
          <img src={assets.chevronDown} alt="" />
        </button>
        <a className="email-link" href="mailto:ie.project@gmail.com">
          <img src={assets.mailHeader} alt="" />
          <span>ie.project@gmail.com</span>
        </a>
        <MessengerLinks />
      </div>
    </header>
  );
}

function ServiceHeading({
  icon,
  title,
  level = 2,
}: {
  icon: string;
  title: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className="service-heading">
      <img src={icon} alt="" />
      <Heading>{title}</Heading>
    </div>
  );
}

function Services() {
  return (
    <section className="services layout-shell" aria-label="Услуги агентства">
      <div className="services__top">
        <article className="surface app-card">
          <div className="app-card__upper">
            <div className="service-copy app-card__copy">
              <ServiceHeading icon={assets.code} title="Создаем приложения" level={1} />
              <p className="service-description service-description--lead">
                <span>Мобильные приложения</span>
                <span className="muted">,</span>
                <span> web-сервисы </span>
                <span className="muted">и</span>
                <span> внутренние платформы</span>
                <span className="muted">. </span>
                <span className="muted">
                  Продумываем продукт целиком: от сценария до инфраструктуры
                </span>
              </p>
            </div>
            <div className="pipeline-visual" aria-hidden="true">
              <img src={assets.pipeline} alt="" />
            </div>
          </div>
          <div className="stages" aria-label="Этапы работы">
            <img className="stages__dot" src={assets.dot} alt="" />
            <div className="stages__list">
              {stages.map((stage, index) => (
                <Fragment key={stage}>
                  <span>{stage}</span>
                  {index < stages.length - 1 ? (
                    <span className="stages__arrow" aria-hidden="true">
                      <img src={assets.chevronRight} alt="" />
                    </span>
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        </article>

        <article className="surface quality-card">
          <div className="service-copy quality-card__copy">
            <ServiceHeading icon={assets.window} title="Чистая разработка" />
            <p className="service-description">
              Мы регулярно проверяем и оптимизируем код, быстро исправляем ошибки и составляем
              подробную документацию
            </p>
          </div>
          <div className="terminal-visual" aria-hidden="true">
            <div className="terminal-visual__crop">
              <img src={assets.terminal} alt="" />
            </div>
          </div>
        </article>
      </div>

      <article className="surface design-card">
        <div className="service-copy design-card__copy">
          <ServiceHeading icon={assets.component} title="Современный дизайн" />
          <p className="service-description">
            Понятный UX, продуманные компоненты и консистентный дизайн. Мы строим масштабируемые
            системы, которые выглядят цельно и вызывают доверие
          </p>
        </div>
        <img className="design-card__visual" src={assets.design} alt="" aria-hidden="true" />
      </article>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <h2>Наши проекты</h2>
      <div className="projects__list">
        {projects.map((project) => (
          <article className="surface project-card" key={project.title}>
            <div className="project-card__preview" aria-hidden="true">
              <span />
            </div>
            <div className="project-card__content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <div className="project-card__action">
              <a href="#top">Посмотреть проект</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer layout-shell">
      <div className="surface site-footer__inner">
        <div className="site-footer__left">
          <Brand />
          <nav aria-label="Навигация в подвале">
            <a className="nav-link" href="#projects">
              Проекты
            </a>
          </nav>
        </div>
        <div className="site-footer__menu">
          <a className="nav-link" href="#projects">
            Проекты
          </a>
          <a className="email-link" href="mailto:ie.project@gmail.com">
            <img src={assets.mail} alt="" />
            <span>ie.project@gmail.com</span>
          </a>
          <MessengerLinks />
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="landing" id="top">
      <Header />
      <main>
        <Services />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
