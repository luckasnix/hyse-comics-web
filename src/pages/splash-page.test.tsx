// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { SplashPage } from "./splash-page.tsx";

afterEach(cleanup);

describe("<SplashPage />", () => {
  it("renders the Hyse Comics logomark with its accessible name and dimensions", () => {
    render(<SplashPage />);

    const logo = screen.getByRole("img", { name: "Hyse Comics logomark" });

    expect(logo).toBeVisible();
    expect(logo).toHaveAttribute("src", "/logomark.svg");
    expect(logo).toHaveAttribute("width", "120");
    expect(logo).toHaveAttribute("height", "120");
  });
});
