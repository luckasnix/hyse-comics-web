// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ListState } from "./list-state";

afterEach(cleanup);

describe("<ListState />", () => {
  it("renders an empty state with an icon and message", () => {
    const { container } = render(
      <ListState kind="empty" message="No items found" />,
    );

    expect(screen.getByText("No items found")).toBeInTheDocument();
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("renders a pending state with a progress indicator and message", () => {
    render(<ListState kind="pending" message="Loading items..." />);

    expect(screen.getByText("Loading items...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders an error state with an icon and message", () => {
    const { container } = render(
      <ListState kind="error" message="Failed to load items." />,
    );

    expect(screen.getByText("Failed to load items.")).toBeInTheDocument();
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
