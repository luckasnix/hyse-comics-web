// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { type TabContainerProps, TabGroup, type TabItem } from "./tab-group";

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

  it("links each tab to its matching panel", () => {
    renderComponent();

    const chaptersTab = screen.getByRole("tab", { name: "Chapters" });
    const creditsTab = screen.getByRole("tab", { name: "Credits" });
    const chaptersPanelId = chaptersTab.getAttribute("aria-controls");
    const creditsPanelId = creditsTab.getAttribute("aria-controls");

    expect(chaptersPanelId).toBeTruthy();
    expect(creditsPanelId).toBeTruthy();

    const chaptersPanel = document.getElementById(
      chaptersPanelId ?? "",
    ) as HTMLElement;
    const creditsPanel = document.getElementById(
      creditsPanelId ?? "",
    ) as HTMLElement;

    expect(chaptersPanel).toBeInTheDocument();
    expect(creditsPanel).toBeInTheDocument();
    expect(chaptersTab.id).not.toBe("");
    expect(creditsTab.id).not.toBe("");
    expect(chaptersPanel.id).not.toBe("");
    expect(creditsPanel.id).not.toBe("");
    expect(chaptersPanel).toHaveAttribute("role", "tabpanel");
    expect(creditsPanel).toHaveAttribute("role", "tabpanel");
    expect(chaptersTab).toHaveAttribute("aria-controls", chaptersPanel.id);
    expect(creditsTab).toHaveAttribute("aria-controls", creditsPanel.id);
    expect(chaptersPanel).toHaveAttribute("aria-labelledby", chaptersTab.id);
    expect(creditsPanel).toHaveAttribute("aria-labelledby", creditsTab.id);
  });

  it("does not reuse tab and panel ids across instances", () => {
    render(
      <>
        <TabGroup initialValue={0}>
          <TabGroup.List items={items} />
          <TabGroup.Panel value={0}>First chapters content</TabGroup.Panel>
        </TabGroup>
        <TabGroup initialValue={0}>
          <TabGroup.List items={items} />
          <TabGroup.Panel value={0}>Second chapters content</TabGroup.Panel>
        </TabGroup>
      </>,
    );

    const chapterTabs = screen.getAllByRole("tab", { name: "Chapters" });
    const chapterPanels = screen.getAllByRole("tabpanel", {
      hidden: true,
      name: "Chapters",
    });

    expect(chapterTabs[0].id).not.toBe(chapterTabs[1].id);
    expect(chapterPanels[0].id).not.toBe(chapterPanels[1].id);
    expect(chapterTabs[0]).toHaveAttribute(
      "aria-controls",
      chapterPanels[0].id,
    );
    expect(chapterTabs[1]).toHaveAttribute(
      "aria-controls",
      chapterPanels[1].id,
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
    expect(
      screen.getByRole("tabpanel", { name: "Chapters" }),
    ).not.toHaveAttribute("hidden");
  });

  it("hides the panel content when its value does not match the selected tab", () => {
    renderComponent({ initialValue: 0 });

    const creditsTab = screen.getByRole("tab", { name: "Credits" });
    const creditsPanelId = creditsTab.getAttribute("aria-controls");

    expect(creditsPanelId).toBeTruthy();

    const creditsPanel = document.getElementById(
      creditsPanelId ?? "",
    ) as HTMLElement;

    expect(creditsPanel).toBeInTheDocument();
    expect(screen.getByText("Credits content")).not.toBeVisible();
    expect(creditsPanel).toHaveAttribute("hidden");
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
