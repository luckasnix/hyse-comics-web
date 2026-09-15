import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { SplashPage } from "./splash-page.tsx";

afterEach(cleanup);

describe("<SplashPage />", () => {
  it("renders the Hyse Comics logomark with its accessible name and dimensions", async () => {
    await render(<SplashPage />);

    const logo = page.getByRole("img", { name: "Hyse Comics logomark" });

    expect(logo).toBeVisible();
    expect(logo).toHaveAttribute("src", "/logomark.svg");
    expect(logo).toHaveAttribute("width", "120");
    expect(logo).toHaveAttribute("height", "120");
  });
});
