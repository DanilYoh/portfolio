import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import landingStyles from "./index.css?inline";

describe("Russian agency landing", () => {
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
    render(<App />);

    const designHeading = screen.getByRole("heading", { level: 2, name: "Современный дизайн" });
    const designCard = designHeading.closest("article");
    const layers = designCard?.querySelector(".design-card__layers");

    expect(designCard).toHaveClass("design-card");
    expect(designCard).toHaveTextContent(
      "Понятный UX, продуманные компоненты и консистентный дизайн. Мы строим масштабируемые системы, которые выглядят цельно и вызывают доверие",
    );
    expect(layers).toHaveAttribute("aria-hidden", "true");
    expect(layers?.querySelectorAll(".design-card__layer")).toHaveLength(3);
    expect(layers?.querySelector("a, button, input, select, textarea, [tabindex]")).toBeNull();
    expect(designCard?.querySelector(".design-card__visual-panel")).not.toBeInTheDocument();
    expect(designCard?.querySelector('img[src="/assets/hero-design.png"]')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Выбор языка: RU" }));
    fireEvent.click(screen.getByRole("option", { name: "EN" }));
    expect(designCard).toHaveTextContent("Modern design");
    expect(designCard).toHaveTextContent(
      "Clear UX, thoughtful components, and a consistent visual system. We build scalable products that feel cohesive and inspire trust",
    );
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
