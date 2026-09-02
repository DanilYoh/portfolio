import { Fragment, type AnimationEvent, useEffect, useRef, useState } from "react";

const assets = {
  brandMark: "/assets/logo-mark.svg",
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
} as const;

type Language = "ru" | "en";

type DescriptionPart = {
  text: string;
  muted?: boolean;
};

type ProjectCopy = {
  id: string;
  title: string;
  description: string;
};

type SiteCopy = {
  meta: {
    title: string;
    description: string;
  };
  brandHomeLabel: string;
  navigation: {
    primaryLabel: string;
    footerLabel: string;
    projects: string;
  };
  languageSelectLabel: string;
  services: {
    label: string;
    appTitle: string;
    appDescription: DescriptionPart[];
    stagesLabel: string;
    stages: string[];
    qualityTitle: string;
    qualityDescription: string;
    designTitle: string;
    designDescription: string;
  };
  projects: {
    title: string;
    listLabel: string;
    viewProject: string;
    items: ProjectCopy[];
  };
};

const copyByLanguage: Record<Language, SiteCopy> = {
  ru: {
    meta: {
      title: "iE — агентство разработки",
      description:
        "iE — агентство разработки мобильных приложений, web-сервисов и внутренних платформ.",
    },
    brandHomeLabel: "iE — на главную",
    navigation: {
      primaryLabel: "Основная навигация",
      footerLabel: "Навигация в подвале",
      projects: "Проекты",
    },
    languageSelectLabel: "Выбор языка",
    services: {
      label: "Услуги агентства",
      appTitle: "Создаем приложения",
      appDescription: [
        { text: "Мобильные приложения" },
        { text: ",", muted: true },
        { text: " web-сервисы " },
        { text: "и", muted: true },
        { text: " внутренние платформы" },
        { text: ". ", muted: true },
        {
          text: "Продумываем продукт целиком: от сценария до инфраструктуры",
          muted: true,
        },
      ],
      stagesLabel: "Этапы работы",
      stages: ["Исследование", "Аналитика", "Дизайн", "Разработка", "Тестирование", "Релиз"],
      qualityTitle: "Чистая разработка",
      qualityDescription:
        "Мы регулярно проверяем и оптимизируем код, быстро исправляем ошибки и составляем подробную документацию",
      designTitle: "Современный дизайн",
      designDescription:
        "Понятный UX, продуманные компоненты и консистентный дизайн. Мы строим масштабируемые системы, которые выглядят цельно и вызывают доверие",
    },
    projects: {
      title: "Наши проекты",
      listLabel: "Список проектов",
      viewProject: "Посмотреть проект",
      items: [
        {
          id: "startup-zone",
          title: "Startup Zone",
          description:
            "Маркетплейс помогает презентовать свои стартапы, а инвесторам находить проекты и отправлять заявки на сделки",
        },
        {
          id: "exchange",
          title: "Exchange",
          description:
            "Приложение для быстрых переводов и обмена фиата или криптовалюты со встроенным KYC для моментальной проверки документов",
        },
        {
          id: "support",
          title: "Система заявок в службу поддержки",
          description:
            "Система обращений в поддержку объединяет создание заявок клиентами, разбор пула агентами и администрирование через CRUD",
        },
        {
          id: "1c-integration",
          title: "Интеграция 1С",
          description:
            "Модуль интеграции 1С связывает документы по договорам в одном окне, автоматически формирует счета и напоминает о платежах",
        },
        {
          id: "workchat",
          title: "WorkChat",
          description:
            "Единая платформа объединяет корпоративные чаты, файловое хранилище и решение организационных задач в одном интерфейсе",
        },
      ],
    },
  },
  en: {
    meta: {
      title: "iE — Software development agency",
      description:
        "iE is a software development agency for mobile applications, web services, and internal platforms.",
    },
    brandHomeLabel: "iE — Home",
    navigation: {
      primaryLabel: "Primary navigation",
      footerLabel: "Footer navigation",
      projects: "Projects",
    },
    languageSelectLabel: "Language",
    services: {
      label: "Agency services",
      appTitle: "We build applications",
      appDescription: [
        { text: "Mobile applications" },
        { text: ", ", muted: true },
        { text: "web services" },
        { text: ", and ", muted: true },
        { text: "internal platforms" },
        { text: ". ", muted: true },
        {
          text: "We design the entire product: from user flows to infrastructure",
          muted: true,
        },
      ],
      stagesLabel: "Workflow stages",
      stages: ["Research", "Analytics", "Design", "Development", "Testing", "Release"],
      qualityTitle: "Clean development",
      qualityDescription:
        "We regularly review and optimize code, fix issues quickly, and prepare detailed documentation",
      designTitle: "Modern design",
      designDescription:
        "Clear UX, thoughtful components, and a consistent visual system. We build scalable products that feel cohesive and inspire trust",
    },
    projects: {
      title: "Our projects",
      listLabel: "Project list",
      viewProject: "View project",
      items: [
        {
          id: "startup-zone",
          title: "Startup Zone",
          description:
            "A marketplace connecting startup founders with investors and deal requests.",
        },
        {
          id: "exchange",
          title: "Exchange",
          description:
            "Fast fiat and crypto transfers with built-in KYC document verification.",
        },
        {
          id: "support",
          title: "Support ticket system",
          description:
            "Customer tickets, agent queue management, and CRUD administration in one system.",
        },
        {
          id: "1c-integration",
          title: "1C integration",
          description:
            "Contract documents, automatic invoices, and payment reminders through 1C integration.",
        },
        {
          id: "workchat",
          title: "WorkChat",
          description:
            "Corporate chats, file storage, and team workflows in one interface.",
        },
      ],
    },
  },
};

const INTRO_FALLBACK_DURATION_MS = 3200;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isForcedPageIntroPreview() {
  return (
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("intro") === "1"
  );
}

function shouldShowPageIntro() {
  return isForcedPageIntroPreview() || !prefersReducedMotion();
}

function PageIntro({
  onBlockingChange,
}: {
  onBlockingChange: (isBlocking: boolean) => void;
}) {
  const [isForcedPreview] = useState(isForcedPageIntroPreview);
  const [shouldRenderIntro] = useState(shouldShowPageIntro);
  const [isComplete, setIsComplete] = useState(false);
  const fallbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldRenderIntro) return;

    document.body.classList.add("is-intro-active");
    fallbackTimerRef.current = window.setTimeout(() => {
      fallbackTimerRef.current = null;
      document.body.classList.remove("is-intro-active");
      setIsComplete(true);
      onBlockingChange(false);
    }, INTRO_FALLBACK_DURATION_MS);

    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      document.body.classList.remove("is-intro-active");
    };
  }, [onBlockingChange, shouldRenderIntro]);

  if (!shouldRenderIntro) return null;

  const finishIntro = (event: AnimationEvent<HTMLDivElement>) => {
    if (
      event.target !== event.currentTarget ||
      event.animationName !== "page-intro-out"
    ) {
      return;
    }

    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    document.body.classList.remove("is-intro-active");
    setIsComplete(true);
    onBlockingChange(false);
  };

  return (
    <div
      aria-hidden="true"
      className={`page-intro${isForcedPreview ? " page-intro--forced" : ""}${isComplete ? " page-intro--complete" : ""}`}
      data-testid="page-intro"
      onAnimationEnd={finishIntro}
    >
      <div className="page-intro__brand">
        <span className="page-intro__mark">
          <img src={assets.brandMark} alt="" />
        </span>
        <span className="page-intro__wordmark-clip">
          <img className="page-intro__wordmark" src={assets.brandWordmark} alt="" />
        </span>
      </div>
      <span className="page-intro__header-line" />
    </div>
  );
}

function Brand({ homeLabel }: { homeLabel: string }) {
  return (
    <a className="brand" href="#top" aria-label={homeLabel}>
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
        className="messenger messenger--filled messenger--whatsapp"
        href="https://wa.me/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={assets.whatsapp} alt="" />
        <span>WhatsApp</span>
      </a>
      <a
        className="messenger messenger--filled messenger--telegram"
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

function Header({
  copy,
  language,
  onLanguageChange,
}: {
  copy: SiteCopy;
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const languageTriggerRef = useRef<HTMLButtonElement>(null);
  const languageOptionRefs = useRef<Record<Language, HTMLButtonElement | null>>({
    ru: null,
    en: null,
  });
  const languages: Language[] = ["ru", "en"];

  useEffect(() => {
    if (!isLanguageOpen) return;

    languageOptionRefs.current[language]?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !languageRef.current?.contains(event.target)
      ) {
        setIsLanguageOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsLanguageOpen(false);
      languageTriggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isLanguageOpen, language]);

  const selectLanguage = (nextLanguage: Language) => {
    onLanguageChange(nextLanguage);
    setIsLanguageOpen(false);
    languageTriggerRef.current?.focus();
  };

  return (
    <header className="site-header layout-shell">
      <div className="site-header__left">
        <Brand homeLabel={copy.brandHomeLabel} />
        <nav className="site-nav" aria-label={copy.navigation.primaryLabel}>
          <a className="nav-link" href="#projects">
            {copy.navigation.projects}
          </a>
        </nav>
      </div>
      <div className="site-header__actions">
        <div
          className={`language${isLanguageOpen ? " language--open" : ""}`}
          ref={languageRef}
          onBlur={(event) => {
            if (
              !(event.relatedTarget instanceof Node) ||
              !event.currentTarget.contains(event.relatedTarget)
            ) {
              setIsLanguageOpen(false);
            }
          }}
        >
          <button
            ref={languageTriggerRef}
            className="language__trigger"
            type="button"
            aria-label={`${copy.languageSelectLabel}: ${language.toUpperCase()}`}
            aria-haspopup="listbox"
            aria-expanded={isLanguageOpen}
            aria-controls="language-options"
            onClick={() => setIsLanguageOpen((isOpen) => !isOpen)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                setIsLanguageOpen(true);
              }
            }}
          >
            <span>{language.toUpperCase()}</span>
            <img className="language__chevron" src={assets.chevronDown} alt="" />
          </button>
          {isLanguageOpen && (
            <div
              className="language__menu"
              id="language-options"
              role="listbox"
              aria-label={copy.languageSelectLabel}
            >
              {languages.map((optionLanguage, index) => {
                const isActive = optionLanguage === language;

                return (
                  <button
                    key={optionLanguage}
                    ref={(node) => {
                      languageOptionRefs.current[optionLanguage] = node;
                    }}
                    className={`language__option${isActive ? " language__option--active" : ""}`}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => selectLanguage(optionLanguage)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                        event.preventDefault();
                        const direction = event.key === "ArrowDown" ? 1 : -1;
                        const nextIndex =
                          (index + direction + languages.length) % languages.length;
                        languageOptionRefs.current[languages[nextIndex]]?.focus();
                      }

                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectLanguage(optionLanguage);
                      }
                    }}
                  >
                    <span>{optionLanguage.toUpperCase()}</span>
                    <span className="language__status" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
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

function Services({ copy }: { copy: SiteCopy["services"] }) {
  return (
    <section className="services layout-shell" aria-label={copy.label}>
      <div className="services__top">
        <article className="surface app-card">
          <div className="app-card__upper">
            <div className="service-copy app-card__copy">
              <ServiceHeading icon={assets.code} title={copy.appTitle} level={1} />
              <p className="service-description service-description--lead">
                {copy.appDescription.map((part, index) => (
                  <span className={part.muted ? "muted" : undefined} key={index}>
                    {part.text}
                  </span>
                ))}
              </p>
            </div>
            <div className="pipeline-visual" aria-hidden="true">
              <img src={assets.pipeline} alt="" />
            </div>
          </div>
          <div className="stages" aria-label={copy.stagesLabel}>
            <img className="stages__dot" src={assets.dot} alt="" />
            <div className="stages__list">
              {copy.stages.map((stage, index) => (
                <Fragment key={stage}>
                  <span>{stage}</span>
                  {index < copy.stages.length - 1 ? (
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
            <ServiceHeading icon={assets.window} title={copy.qualityTitle} />
            <p className="service-description">{copy.qualityDescription}</p>
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
          <ServiceHeading icon={assets.component} title={copy.designTitle} />
          <p className="service-description">{copy.designDescription}</p>
        </div>
        <div className="design-card__layers" aria-hidden="true">
          <div className="design-card__layer design-card__layer--back" />
          <div className="design-card__layer design-card__layer--middle">
            <div className="design-card__layer-lines design-card__layer-lines--middle">
              <span />
              <span />
            </div>
          </div>
          <div className="design-card__layer design-card__layer--front">
            <span className="design-card__layer-accent" />
            <div className="design-card__layer-lines">
              <span />
              <span />
              <span />
            </div>
            <span className="design-card__layer-action" />
          </div>
        </div>
      </article>
    </section>
  );
}

function Projects({ copy }: { copy: SiteCopy["projects"] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [hasPreviousProject, setHasPreviousProject] = useState(false);
  const [hasNextProject, setHasNextProject] = useState(true);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateScrollPosition = () => {
      const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      setHasPreviousProject(scroller.scrollLeft > 1);
      setHasNextProject(scroller.scrollLeft < maxScrollLeft - 1);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      const scrollDelta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const deltaMultiplier =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? scroller.clientWidth
            : 1;
      const nextScrollLeft = Math.min(
        maxScrollLeft,
        Math.max(0, scroller.scrollLeft + scrollDelta * deltaMultiplier),
      );

      event.preventDefault();
      if (nextScrollLeft === scroller.scrollLeft) return;

      scroller.scrollLeft = nextScrollLeft;
      updateScrollPosition();
    };

    updateScrollPosition();
    scroller.addEventListener("wheel", handleWheel, { passive: false });
    scroller.addEventListener("scroll", updateScrollPosition, { passive: true });
    window.addEventListener("resize", updateScrollPosition);

    return () => {
      scroller.removeEventListener("wheel", handleWheel);
      scroller.removeEventListener("scroll", updateScrollPosition);
      window.removeEventListener("resize", updateScrollPosition);
    };
  }, []);

  return (
    <section className="projects layout-shell" id="projects">
      <h2>{copy.title}</h2>
      <div
        className="projects__viewport"
        data-has-previous={hasPreviousProject}
        data-has-next={hasNextProject}
        data-testid="projects-viewport"
      >
        <div
          aria-label={copy.listLabel}
          className="projects__list"
          data-testid="projects-scroller"
          ref={scrollerRef}
          tabIndex={0}
        >
          {copy.items.map((project) => (
            <article className="surface project-card" key={project.id}>
              <div className="project-card__preview" aria-hidden="true">
                <span />
              </div>
              <div className="project-card__content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-card__action">
                <a href="#top">{copy.viewProject}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ copy }: { copy: SiteCopy }) {
  return (
    <footer className="site-footer layout-shell">
      <div className="surface site-footer__inner">
        <div className="site-footer__left">
          <Brand homeLabel={copy.brandHomeLabel} />
          <nav aria-label={copy.navigation.footerLabel}>
            <a className="nav-link" href="#projects">
              {copy.navigation.projects}
            </a>
          </nav>
        </div>
        <div className="site-footer__menu">
          <a className="nav-link" href="#projects">
            {copy.navigation.projects}
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
  const [language, setLanguage] = useState<Language>("ru");
  const [isIntroBlocking, setIsIntroBlocking] = useState(shouldShowPageIntro);
  const copy = copyByLanguage[language];

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.documentElement.lang = language;
    document.title = copy.meta.title;
    if (description) description.content = copy.meta.description;

    return () => {
      document.documentElement.lang = previousLanguage;
      document.title = previousTitle;
      if (description && previousDescription !== undefined) {
        description.content = previousDescription;
      }
    };
  }, [copy.meta.description, copy.meta.title, language]);

  return (
    <>
      <PageIntro onBlockingChange={setIsIntroBlocking} />
      <div className="landing" id="top" inert={isIntroBlocking}>
        <Header copy={copy} language={language} onLanguageChange={setLanguage} />
        <main>
          <Services copy={copy.services} />
          <Projects copy={copy.projects} />
        </main>
        <Footer copy={copy} />
      </div>
    </>
  );
}
