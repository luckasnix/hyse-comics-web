// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TabGroup } from "./component";
import type { TabContainerProps, TabItem } from "./types";

const items: Array<TabItem> = [
  { value: 0, label: "Chapters" },
  { value: 1, label: "Credits" },
];

const renderComponent = ({
  initialValue = 0,
}: Partial<Pick<TabContainerProps, "initialValue">> = {}) =>
  render(
    <TabGroup initialValue={initialValue}>
      <TabGroup.List items={items} />
      <TabGroup.Panel value={0}>Chapters content</TabGroup.Panel>
      <TabGroup.Panel value={1}>Credits content</TabGroup.Panel>
    </TabGroup>,
  );

afterEach(cleanup);

describe("<TabGroup />", () => {
  it("renders children inside the compound container", () => {
    render(
      <TabGroup initialValue={0}>
        <span>Tabs content</span>
      </TabGroup>,
    );

    expect(screen.getByText("Tabs content")).toBeInTheDocument();
  });

  it("exposes all compound subcomponents", () => {
    expect(TabGroup.List).toBeDefined();
    expect(TabGroup.Panel).toBeDefined();
  });
});

describe("<TabGroup.List />", () => {
  it("renders one tab for each item", () => {
    render(
      <TabGroup initialValue={0}>
        <TabGroup.List items={items} />
      </TabGroup>,
    );

    expect(screen.getByRole("tab", { name: "Chapters" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Credits" })).toBeInTheDocument();
  });

  it("selects the tab matching the initialValue", () => {
    render(
      <TabGroup initialValue={1}>
        <TabGroup.List items={items} />
      </TabGroup>,
    );

    expect(screen.getByRole("tab", { name: "Chapters" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByRole("tab", { name: "Credits" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("updates the selected tab when another tab is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("tab", { name: "Credits" }));

    expect(screen.getByRole("tab", { name: "Chapters" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByRole("tab", { name: "Credits" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("throws when rendered outside TabGroup", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(() => render(<TabGroup.List items={items} />)).toThrow(
      "TabGroup components must be used within TabGroup.",
    );

    consoleErrorSpy.mockRestore();
  });
});

describe("<TabGroup.Panel />", () => {
  it("renders the panel content when its value matches the selected tab", () => {
    renderComponent({ initialValue: 0 });

    expect(screen.getByText("Chapters content")).toBeVisible();
  });

  it("hides the panel content when its value does not match the selected tab", () => {
    renderComponent({ initialValue: 0 });

    expect(screen.getByText("Credits content")).not.toBeVisible();
  });

  it("shows the matching panel after the selected tab changes", async () => {
    const user = userEvent.setup();

    renderComponent({ initialValue: 0 });

    await user.click(screen.getByRole("tab", { name: "Credits" }));

    expect(screen.getByText("Chapters content")).not.toBeVisible();
    expect(screen.getByText("Credits content")).toBeVisible();
  });

  it("throws when rendered outside TabGroup", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(() =>
      render(<TabGroup.Panel value={0}>Chapters content</TabGroup.Panel>),
    ).toThrow("TabGroup components must be used within TabGroup.");

    consoleErrorSpy.mockRestore();
  });
});
