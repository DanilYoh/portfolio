import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

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
});
