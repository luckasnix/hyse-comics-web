import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { ListState } from "./list-state.tsx";

afterEach(cleanup);

describe("<ListState />", () => {
  it("renders an empty state with an icon and message", async () => {
    const { container } = await render(
      <ListState kind="empty" message="No items found" />,
    );

    await expect.element(page.getByText("No items found")).toBeInTheDocument();
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("renders a pending state with a progress indicator and message", async () => {
    await render(<ListState kind="pending" message="Loading items..." />);

    await expect
      .element(page.getByText("Loading items..."))
      .toBeInTheDocument();
    await expect.element(page.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders an error state with an icon and message", async () => {
    const { container } = await render(
      <ListState kind="error" message="Failed to load items." />,
    );

    await expect
      .element(page.getByText("Failed to load items."))
      .toBeInTheDocument();
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
