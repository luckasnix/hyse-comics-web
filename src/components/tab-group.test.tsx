import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import {
  type TabContainerProps,
  TabGroup,
  type TabItem,
} from "./tab-group.tsx";

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
  it("renders children inside the compound container", async () => {
    await render(
      <TabGroup initialValue={0}>
        <span>Tabs content</span>
      </TabGroup>,
    );

    await expect.element(page.getByText("Tabs content")).toBeInTheDocument();
  });

  it("exposes all compound subcomponents", async () => {
    expect(TabGroup.List).toBeDefined();
    expect(TabGroup.Panel).toBeDefined();
  });
});

describe("<TabGroup.List />", () => {
  it("renders one tab for each item", async () => {
    await render(
      <TabGroup initialValue={0}>
        <TabGroup.List items={items} />
      </TabGroup>,
    );

    await expect
      .element(page.getByRole("tab", { name: "Chapters" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("tab", { name: "Credits" }))
      .toBeInTheDocument();
  });

  it("selects the tab matching the initialValue", async () => {
    await render(
      <TabGroup initialValue={1}>
        <TabGroup.List items={items} />
      </TabGroup>,
    );

    await expect
      .element(page.getByRole("tab", { name: "Chapters" }))
      .toHaveAttribute("aria-selected", "false");
    await expect
      .element(page.getByRole("tab", { name: "Credits" }))
      .toHaveAttribute("aria-selected", "true");
  });

  it("updates the selected tab when another tab is clicked", async () => {
    const user = userEvent.setup();

    await renderComponent();

    await user.click(page.getByRole("tab", { name: "Credits" }));

    await expect
      .element(page.getByRole("tab", { name: "Chapters" }))
      .toHaveAttribute("aria-selected", "false");
    await expect
      .element(page.getByRole("tab", { name: "Credits" }))
      .toHaveAttribute("aria-selected", "true");
  });

  it("links each tab to its matching panel", async () => {
    await renderComponent();

    const chaptersTab = page.getByRole("tab", { name: "Chapters" }).element();
    const creditsTab = page.getByRole("tab", { name: "Credits" }).element();
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

  it("does not reuse tab and panel ids across instances", async () => {
    await render(
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

    const chapterTabs = page.getByRole("tab", { name: "Chapters" }).elements();
    const chapterPanels = page
      .getByRole("tabpanel", {
        includeHidden: true,
        name: "Chapters",
      })
      .elements();

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

  it("throws when rendered outside TabGroup", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    await expect(render(<TabGroup.List items={items} />)).rejects.toThrow(
      "TabGroup components must be used within TabGroup.",
    );

    consoleErrorSpy.mockRestore();
  });
});

describe("<TabGroup.Panel />", () => {
  it("renders the panel content when its value matches the selected tab", async () => {
    await renderComponent({ initialValue: 0 });

    await expect.element(page.getByText("Chapters content")).toBeVisible();
    await expect
      .element(page.getByRole("tabpanel", { name: "Chapters" }))
      .not.toHaveAttribute("hidden");
  });

  it("hides the panel content when its value does not match the selected tab", async () => {
    await renderComponent({ initialValue: 0 });

    const creditsTab = page.getByRole("tab", { name: "Credits" }).element();
    const creditsPanelId = creditsTab.getAttribute("aria-controls");

    expect(creditsPanelId).toBeTruthy();

    const creditsPanel = document.getElementById(
      creditsPanelId ?? "",
    ) as HTMLElement;

    expect(creditsPanel).toBeInTheDocument();
    await expect.element(page.getByText("Credits content")).not.toBeVisible();
    expect(creditsPanel).toHaveAttribute("hidden");
  });

  it("shows the matching panel after the selected tab changes", async () => {
    const user = userEvent.setup();

    await renderComponent({ initialValue: 0 });

    await user.click(page.getByRole("tab", { name: "Credits" }));

    await expect.element(page.getByText("Chapters content")).not.toBeVisible();
    await expect.element(page.getByText("Credits content")).toBeVisible();
  });

  it("throws when rendered outside TabGroup", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    await expect(
      render(<TabGroup.Panel value={0}>Chapters content</TabGroup.Panel>),
    ).rejects.toThrow("TabGroup components must be used within TabGroup.");

    consoleErrorSpy.mockRestore();
  });
});
