import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import indexMarkup from "../index.html?raw";
import App from "./App";
import landingStyles from "./index.css?inline";
import introStyles from "./intro.css?inline";

function installLandingStyles() {
  const style = document.createElement("style");
  style.textContent = `${landingStyles}\n${introStyles}`;
  document.head.append(style);
  return () => style.remove();
}

function endAnimation(element: Element, animationName: string) {
  const event = new Event("webkitAnimationEnd", { bubbles: true });
  Object.defineProperty(event, "animationName", { value: animationName });
  fireEvent(element, event);
}

describe("Russian agency landing", () => {
  it("shows a branded opening screen and releases the page after its animation", () => {
    const removeStyles = installLandingStyles();

    try {
      render(<App />);

      const intro = screen.getByTestId("page-intro");
      const introBrand = intro.querySelector(".page-intro__brand");
      const introLine = intro.querySelector(".page-intro__header-line");
      const landing = document.querySelector(".landing");

      expect(intro).toHaveAttribute("aria-hidden", "true");
      expect(document.body).toHaveClass("is-intro-active");
      expect(landing).toHaveAttribute("inert");
      expect(intro.querySelector('img[src="/assets/logo-mark.svg"]')).toBeInTheDocument();
      expect(intro.querySelector('img[src="/assets/logo-mark.png"]')).not.toBeInTheDocument();
      expect(intro.querySelector('img[src="/assets/logo-ie.svg"]')).toBeInTheDocument();
      expect(document.querySelector('.brand img[src="/assets/logo-mark.svg"]')).toBeInTheDocument();

      endAnimation(introBrand!, "page-intro-out");
      endAnimation(intro, "page-intro-brand-flight");

      expect(screen.getByTestId("page-intro")).toBeInTheDocument();
      expect(document.body).toHaveClass("is-intro-active");
      expect(landing).toHaveAttribute("inert");

      endAnimation(intro, "page-intro-out");

      expect(intro).toHaveClass("page-intro--complete");
      expect(document.body).not.toHaveClass("is-intro-active");
      expect(landing).not.toHaveAttribute("inert");
      expect(getComputedStyle(intro).opacity).toBe("0");
      expect(getComputedStyle(intro).pointerEvents).toBe("none");
      expect(getComputedStyle(intro).willChange).toBe("auto");
      expect(getComputedStyle(introBrand!).willChange).toBe("auto");
      expect(getComputedStyle(introLine!).willChange).toBe("auto");
    } finally {
      removeStyles();
    }
  });

  it("skips the opening screen when reduced motion is requested", () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });

    try {
      render(<App />);

      expect(screen.queryByTestId("page-intro")).not.toBeInTheDocument();
      expect(document.body).not.toHaveClass("is-intro-active");
      expect(document.querySelector(".landing")).not.toHaveAttribute("inert");
      expect(window.matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
    } finally {
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        value: originalMatchMedia,
      });
    }
  });

  it("allows the opening animation to be forced for a preview", () => {
    const originalLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const originalMatchMedia = window.matchMedia;
    window.history.replaceState({}, "", "/?intro=1");
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });

    try {
      render(<App />);

      const forcedIntro = screen.getByTestId("page-intro");
      expect(forcedIntro).toBeInTheDocument();
      expect(forcedIntro).toHaveClass("page-intro--forced");
      expect(document.body).toHaveClass("is-intro-active");
      expect(document.querySelector(".landing")).toHaveAttribute("inert");
    } finally {
      window.history.replaceState({}, "", originalLocation);
      Object.defineProperty(window, "matchMedia", {
        configurable: true,
        value: originalMatchMedia,
      });
    }
  });

  it("blocks pointer interaction and preloads the animated brand mark", () => {
    const removeStyles = installLandingStyles();

    try {
      render(<App />);

      const intro = screen.getByTestId("page-intro");
      const parsedIndex = new DOMParser().parseFromString(indexMarkup, "text/html");
      const preload = parsedIndex.querySelector(
        'link[rel="preload"][as="image"][href="/assets/logo-mark.svg"]',
      );

      expect(getComputedStyle(intro).pointerEvents).toBe("auto");
      expect(preload).not.toBeNull();
    } finally {
      removeStyles();
    }
  });

  it("renders the vector brand in a high-resolution animation layer", () => {
    const removeStyles = installLandingStyles();

    try {
      render(<App />);

      const intro = screen.getByTestId("page-intro");
      const brand = intro.querySelector(".page-intro__brand");
      const mark = intro.querySelector(".page-intro__mark");

      expect(intro.querySelector('img[src="/assets/logo-mark.svg"]')).toBeInTheDocument();
      expect(getComputedStyle(brand!).height).toBe("140px");
      expect(getComputedStyle(brand!).gap).toBe("60px");
      expect(getComputedStyle(mark!).width).toBe("90px");
      expect(getComputedStyle(mark!).height).toBe("100px");
    } finally {
      removeStyles();
    }
  });

  it("keeps the opening background neutral while the brand moves", () => {
    const removeStyles = installLandingStyles();

    try {
      render(<App />);

      const intro = screen.getByTestId("page-intro");
      const landing = document.querySelector(".landing");
      const mark = intro.querySelector(".page-intro__mark");
      const line = intro.querySelector(".page-intro__header-line");
      const introStyle = getComputedStyle(intro);

      expect(introStyle.backgroundColor).toBe(getComputedStyle(landing!).backgroundColor);
      expect(introStyle.backgroundImage).toBe("none");
      expect(["", "none"]).toContain(introStyle.boxShadow);
      expect(["", "none"]).toContain(getComputedStyle(mark!).filter);
      expect(getComputedStyle(line!).backgroundImage).toBe("none");
    } finally {
      removeStyles();
    }
  });

  it("turns the single lower intro line into the persistent header divider", () => {
    const removeStyles = installLandingStyles();

    try {
      render(<App />);

      const intro = screen.getByTestId("page-intro");
      const brand = intro.querySelector<HTMLElement>(".page-intro__brand");
      const line = intro.querySelector<HTMLElement>(".page-intro__header-line");
      const header = document.querySelector(".site-header");
      const lineStyle = getComputedStyle(line!);
      const headerStyle = getComputedStyle(header!);

      expect(line).toBeInTheDocument();
      expect(brand).not.toContainElement(line!);
      expect(lineStyle.height).toBe("1px");
      expect(headerStyle.borderBottomWidth).toBe("1px");
      expect(lineStyle.backgroundColor).toBe(headerStyle.borderBottomColor);
    } finally {
      removeStyles();
    }
  });

  it("renders the primary service and projects structure from the design", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Создаем приложения",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Наши проекты",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Посмотреть проект")).toHaveLength(5);
  });

  it("places every major section on the same horizontal layout shell", () => {
    const { container } = render(<App />);

    const majorSections = [
      container.querySelector("header"),
      container.querySelector("section.services"),
      container.querySelector("#projects"),
      container.querySelector("footer"),
    ];

    expect(majorSections).not.toContain(null);
    majorSections.forEach((section) => expect(section).toHaveClass("layout-shell"));
  });

  it("switches the complete landing page between Russian and English", () => {
    render(<App />);

    expect(document.documentElement).toHaveAttribute("lang", "ru");
    const russianLanguageTrigger = screen.getByRole("button", {
      name: "Выбор языка: RU",
    });
    expect(russianLanguageTrigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(russianLanguageTrigger);

    const russianLanguageMenu = screen.getByRole("listbox", { name: "Выбор языка" });
    expect(russianLanguageTrigger).toHaveAttribute("aria-expanded", "true");
    expect(
      within(russianLanguageMenu).getByRole("option", { name: "RU" }),
    ).toHaveAttribute("aria-selected", "true");
    fireEvent.click(
      within(russianLanguageMenu).getByRole("option", { name: "EN" }),
    );

    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(document.title).toBe("iE — Software development agency");
    expect(
      screen.getByRole("heading", { level: 1, name: "We build applications" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Our projects" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Research")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Support ticket system" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("View project")).toHaveLength(5);
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    const englishLanguageTrigger = screen.getByRole("button", {
      name: "Language: EN",
    });
    expect(englishLanguageTrigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(englishLanguageTrigger);
    fireEvent.click(screen.getByRole("option", { name: "RU" }));
    expect(document.documentElement).toHaveAttribute("lang", "ru");
    expect(
      screen.getByRole("heading", { level: 1, name: "Создаем приложения" }),
    ).toBeInTheDocument();
  });

  it("closes the language menu with Escape", () => {
    render(<App />);

    const languageTrigger = screen.getByRole("button", {
      name: "Выбор языка: RU",
    });
    fireEvent.click(languageTrigger);
    expect(screen.getByRole("listbox", { name: "Выбор языка" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("listbox", { name: "Выбор языка" })).not.toBeInTheDocument();
    expect(languageTrigger).toHaveFocus();
  });

  it("closes the language menu when keyboard focus leaves the selector", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", { name: "Выбор языка: RU" }),
    );
    const activeLanguage = screen.getByRole("option", { name: "RU" });
    const projectsLink = screen.getAllByRole("link", { name: "Проекты" })[0];

    fireEvent.blur(activeLanguage, { relatedTarget: projectsLink });

    expect(screen.queryByRole("listbox", { name: "Выбор языка" })).not.toBeInTheDocument();
  });

  it("renders the design service as three decorative layers without the legacy screenshot", () => {
    const removeStyles = installLandingStyles();

    try {
      render(<App />);

      const designHeading = screen.getByRole("heading", { level: 2, name: "Современный дизайн" });
      const designCard = designHeading.closest("article");
      const layers = designCard?.querySelector(".design-card__layers");
      const designCardStyle = getComputedStyle(designCard!);

      expect(designCard).toHaveClass("design-card");
      expect(designCard).toHaveTextContent(
        "Понятный UX, продуманные компоненты и консистентный дизайн. Мы строим масштабируемые системы, которые выглядят цельно и вызывают доверие",
      );
      expect(layers).toHaveAttribute("aria-hidden", "true");
      expect(layers?.querySelectorAll(".design-card__layer")).toHaveLength(3);
      expect(layers?.querySelector("a, button, input, select, textarea, [tabindex]")).toBeNull();
      expect(designCard?.querySelector(".design-card__visual-panel")).not.toBeInTheDocument();
      expect(designCard?.querySelector('img[src="/assets/hero-design.png"]')).not.toBeInTheDocument();
      expect(designCardStyle.backgroundColor).toBe("rgba(255, 255, 255, 0.02)");
      expect(designCardStyle.backgroundImage).toBe("none");

      fireEvent.click(screen.getByRole("button", { name: "Выбор языка: RU" }));
      fireEvent.click(screen.getByRole("option", { name: "EN" }));
      expect(designCard).toHaveTextContent("Modern design");
      expect(designCard).toHaveTextContent(
        "Clear UX, thoughtful components, and a consistent visual system. We build scalable products that feel cohesive and inspire trust",
      );
    } finally {
      removeStyles();
    }
  });

  it("renders messenger buttons without borders", () => {
    const style = document.createElement("style");
    style.textContent = landingStyles;
    document.head.append(style);

    try {
      render(<App />);

      const messengerLinks = [
        ...screen.getAllByRole("link", { name: "WhatsApp" }),
        ...screen.getAllByRole("link", { name: "Telegram" }),
      ];

      messengerLinks.forEach((link) => {
        const computedStyle = getComputedStyle(link);
        expect(computedStyle.borderTopStyle).toBe("none");
        expect(computedStyle.borderTopWidth).toBe("0px");
      });
    } finally {
      style.remove();
    }
  });

  it("moves the projects rail horizontally with a vertical mouse wheel", () => {
    render(<App />);

    const scroller = screen.getByTestId("projects-scroller");
    Object.defineProperties(scroller, {
      clientWidth: { configurable: true, value: 1280 },
      scrollWidth: { configurable: true, value: 1964 },
    });

    fireEvent.wheel(scroller, { deltaX: 0, deltaY: 396 });
    expect(scroller.scrollLeft).toBe(396);

    fireEvent.wheel(scroller, { deltaX: 0, deltaY: 1000 });
    expect(scroller.scrollLeft).toBe(684);
  });

  it("normalizes line-based mouse wheel movement", () => {
    render(<App />);

    const scroller = screen.getByTestId("projects-scroller");
    Object.defineProperties(scroller, {
      clientWidth: { configurable: true, value: 1280 },
      scrollWidth: { configurable: true, value: 1964 },
    });

    fireEvent.wheel(scroller, { deltaX: 0, deltaY: 3, deltaMode: 1 });
    expect(scroller.scrollLeft).toBe(48);
  });

  it("keeps page scrolling locked while the wheel is over the projects rail", () => {
    render(<App />);

    const scroller = screen.getByTestId("projects-scroller");
    Object.defineProperties(scroller, {
      clientWidth: { configurable: true, value: 1280 },
      scrollWidth: { configurable: true, value: 1964 },
    });

    scroller.scrollLeft = 0;
    expect(fireEvent.wheel(scroller, { deltaX: 0, deltaY: -100 })).toBe(false);
    expect(scroller.scrollLeft).toBe(0);

    scroller.scrollLeft = 684;
    expect(fireEvent.wheel(scroller, { deltaX: 0, deltaY: 100 })).toBe(false);
    expect(scroller.scrollLeft).toBe(684);
  });

  it("leaves browser zoom gestures untouched", () => {
    render(<App />);

    const scroller = screen.getByTestId("projects-scroller");
    Object.defineProperties(scroller, {
      clientWidth: { configurable: true, value: 1280 },
      scrollWidth: { configurable: true, value: 1964 },
    });

    expect(fireEvent.wheel(scroller, { ctrlKey: true, deltaY: 100 })).toBe(true);
    expect(scroller.scrollLeft).toBe(0);
  });

  it("fades the project rail edges based on the current scroll position", () => {
    render(<App />);

    const viewport = screen.getByTestId("projects-viewport");
    const scroller = screen.getByTestId("projects-scroller");
    Object.defineProperties(scroller, {
      clientWidth: { configurable: true, value: 1280 },
      scrollWidth: { configurable: true, value: 1964 },
    });

    fireEvent.scroll(scroller);
    expect(viewport).toHaveAttribute("data-has-previous", "false");
    expect(viewport).toHaveAttribute("data-has-next", "true");

    scroller.scrollLeft = 100;
    fireEvent.scroll(scroller);
    expect(viewport).toHaveAttribute("data-has-previous", "true");
    expect(viewport).toHaveAttribute("data-has-next", "true");

    scroller.scrollLeft = 684;
    fireEvent.scroll(scroller);
    expect(viewport).toHaveAttribute("data-has-previous", "true");
    expect(viewport).toHaveAttribute("data-has-next", "false");
  });

  it("lets project cards grow with localized content", () => {
    const style = document.createElement("style");
    style.textContent = landingStyles;
    document.head.append(style);
    const { container } = render(<App />);

    const projectCard = container.querySelector<HTMLElement>(".project-card");
    const projectContent = container.querySelector<HTMLElement>(".project-card__content");

    expect(projectCard).not.toBeNull();
    expect(projectContent).not.toBeNull();
    expect(getComputedStyle(projectCard!).height).toBe("auto");
    expect(getComputedStyle(projectContent!).height).toBe("auto");
    expect(getComputedStyle(projectContent!).flexGrow).toBe("1");

    style.remove();
  });
});
