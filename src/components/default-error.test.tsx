import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { DefaultError } from "./default-error.tsx";

afterEach(cleanup);

describe("<DefaultError />", () => {
  it("renders the error heading and default description", async () => {
    await render(<DefaultError />);

    await expect
      .element(page.getByRole("heading", { level: 3, name: "Error" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByText("Something went wrong. Please try again later."))
      .toBeInTheDocument();
  });
});
