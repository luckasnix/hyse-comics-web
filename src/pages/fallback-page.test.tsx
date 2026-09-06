// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { FallbackPage } from "./fallback-page.tsx";

afterEach(cleanup);

describe("<FallbackPage />", () => {
  it("renders an indeterminate loading indicator", () => {
    render(<FallbackPage />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toBeVisible();
    expect(progress).not.toHaveAttribute("aria-valuenow");
  });
});
