import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { FallbackPage } from "./fallback-page.tsx";

afterEach(cleanup);

describe("<FallbackPage />", () => {
  it("renders an indeterminate loading indicator", async () => {
    await render(<FallbackPage />);

    const progress = page.getByRole("progressbar");

    expect(progress).toBeVisible();
    expect(progress).not.toHaveAttribute("aria-valuenow");
  });
});
