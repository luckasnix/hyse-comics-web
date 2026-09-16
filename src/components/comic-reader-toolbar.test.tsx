import { useHotkey } from "@tanstack/react-hotkeys";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { ComicProvider } from "#/contexts/comic.tsx";
import { chaptersMock, comicsMock, pagesMock } from "#/mocks/comics.ts";

import {
  ComicReaderToolbar,
  type ComicReaderToolbarProps,
} from "./comic-reader-toolbar.tsx";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    params,
    to,
  }: {
    children: ReactNode;
    params?: { locale?: string };
    to: string;
  }) => <a href={to.replace("{-$locale}", params?.locale ?? "")}>{children}</a>,
  useParams: () => ({ locale: "en-US" }),
}));

vi.mock("@tanstack/react-hotkeys", () => ({
  useHotkey: vi.fn(),
}));

const comic = comicsMock[0];
const chapters = chaptersMock.slice(0, 2);
const pages = pagesMock.slice(0, 2);

const enterFullscreenSpy = vi.fn();
const exitFullscreenSpy = vi.fn();
const toggleFullscreenSpy = vi.fn();
const toggleZoomSpy = vi.fn();
const openDrawerSpy = vi.fn();
const toggleDrawerSpy = vi.fn();

const defaultProps: ComicReaderToolbarProps = {
  carouselApi: undefined,
  isZoomEnabled: false,
  isFullscreen: false,
  toggleZoom: toggleZoomSpy,
  enterFullscreen: enterFullscreenSpy,
  exitFullscreen: exitFullscreenSpy,
  toggleFullscreen: toggleFullscreenSpy,
  openDrawer: openDrawerSpy,
  toggleDrawer: toggleDrawerSpy,
};

const renderComponent = (overrides: Partial<ComicReaderToolbarProps> = {}) =>
  render(
    <ComicProvider
      comic={comic}
      chapters={chapters}
      pages={pages}
      currentComicId={comic.id}
      currentChapterId={chapters[0].id}
    >
      <ComicReaderToolbar {...defaultProps} {...overrides} />
    </ComicProvider>,
  );

afterEach(async () => {
  await cleanup();
  vi.clearAllMocks();
});

describe("<ComicReaderToolbar />", () => {
  it("renders the page counter with placeholders when carousel is not ready", async () => {
    await renderComponent();

    await expect.element(page.getByText("? / ?")).toBeInTheDocument();
  });

  it("renders all eight toolbar buttons", async () => {
    await renderComponent();

    const buttons = page.getByRole("button").elements();

    expect(buttons).toHaveLength(8);
  });

  it("renders the navigation buttons with RTL labels for an eastern-direction comic", async () => {
    await renderComponent();

    await expect
      .element(page.getByRole("button", { name: "Last page (shift + ←)" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Next page (←)" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Previous page (→)" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "First page (shift + →)" }))
      .toBeInTheDocument();
  });

  it("renders the navigation buttons with LTR labels for a western-direction comic", async () => {
    const westernComic = comicsMock[1];

    await render(
      <ComicProvider
        comic={westernComic}
        chapters={chapters}
        pages={pages}
        currentComicId={westernComic.id}
        currentChapterId={chapters[0].id}
      >
        <ComicReaderToolbar {...defaultProps} />
      </ComicProvider>,
    );

    await expect
      .element(page.getByRole("button", { name: "First page (shift + ←)" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Previous page (←)" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Next page (→)" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Last page (shift + →)" }))
      .toBeInTheDocument();
  });

  it("disables all navigation buttons when carousel is not ready", async () => {
    await renderComponent();

    await expect
      .element(page.getByRole("button", { name: "Last page (shift + ←)" }))
      .toBeDisabled();
    await expect
      .element(page.getByRole("button", { name: "Next page (←)" }))
      .toBeDisabled();
    await expect
      .element(page.getByRole("button", { name: "Previous page (→)" }))
      .toBeDisabled();
    await expect
      .element(page.getByRole("button", { name: "First page (shift + →)" }))
      .toBeDisabled();
  });

  it("renders the enter fullscreen button when not in fullscreen", async () => {
    await renderComponent({ isFullscreen: false });

    await expect
      .element(page.getByRole("button", { name: "Enter fullscreen (f)" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Exit fullscreen (f)" }))
      .not.toBeInTheDocument();
  });

  it("renders the exit fullscreen button when in fullscreen", async () => {
    await renderComponent({ isFullscreen: true });

    await expect
      .element(page.getByRole("button", { name: "Exit fullscreen (f)" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Enter fullscreen (f)" }))
      .not.toBeInTheDocument();
  });

  it("renders the Zoom button before the fullscreen button", async () => {
    await renderComponent({ isFullscreen: false });

    const endButtons = page.getByRole("button").elements().slice(-3);

    expect(
      endButtons.map((button) => button.getAttribute("aria-label")),
    ).toEqual(["Zoom (z)", "Enter fullscreen (f)", "More (m)"]);
  });

  it("marks the Zoom button as inactive when zoom is disabled", async () => {
    await renderComponent({ isZoomEnabled: false });

    await expect
      .element(page.getByRole("button", { name: "Zoom (z)" }))
      .toHaveAttribute("aria-pressed", "false");
  });

  it("marks the Zoom button as active when zoom is enabled", async () => {
    await renderComponent({ isZoomEnabled: true });

    await expect
      .element(page.getByRole("button", { name: "Zoom (z)" }))
      .toHaveAttribute("aria-pressed", "true");
  });

  it("calls toggleZoom when the Zoom button is clicked", async () => {
    const user = userEvent.setup();

    await renderComponent();

    await user.click(page.getByRole("button", { name: "Zoom (z)" }));

    expect(toggleZoomSpy).toHaveBeenCalledOnce();
  });

  it("registers keyboard shortcuts for reader actions", async () => {
    await renderComponent();

    const useHotkeyMock = vi.mocked(useHotkey);

    expect(useHotkeyMock).toHaveBeenCalledWith(
      "Shift+ArrowLeft",
      expect.any(Function),
    );
    expect(useHotkeyMock).toHaveBeenCalledWith(
      "ArrowLeft",
      expect.any(Function),
    );
    expect(useHotkeyMock).toHaveBeenCalledWith(
      "ArrowRight",
      expect.any(Function),
    );
    expect(useHotkeyMock).toHaveBeenCalledWith(
      "Shift+ArrowRight",
      expect.any(Function),
    );
    expect(useHotkeyMock).toHaveBeenCalledWith("F", toggleFullscreenSpy);
    expect(useHotkeyMock).toHaveBeenCalledWith("Z", toggleZoomSpy);
    expect(useHotkeyMock).toHaveBeenCalledWith("M", toggleDrawerSpy, {
      enabled: true,
    });
  });

  it("disables the drawer keyboard shortcut in fullscreen", async () => {
    await renderComponent({ isFullscreen: true });

    expect(vi.mocked(useHotkey)).toHaveBeenCalledWith("M", toggleDrawerSpy, {
      enabled: false,
    });
  });

  it("calls enterFullscreen when the enter fullscreen button is clicked", async () => {
    const user = userEvent.setup();

    await renderComponent({ isFullscreen: false });

    await user.click(
      page.getByRole("button", { name: "Enter fullscreen (f)" }),
    );

    expect(enterFullscreenSpy).toHaveBeenCalledOnce();
  });

  it("calls exitFullscreen when the exit fullscreen button is clicked", async () => {
    const user = userEvent.setup();

    await renderComponent({ isFullscreen: true });

    await user.click(page.getByRole("button", { name: "Exit fullscreen (f)" }));

    expect(exitFullscreenSpy).toHaveBeenCalledOnce();
  });

  it("renders the More button enabled when not in fullscreen", async () => {
    await renderComponent({ isFullscreen: false });

    await expect
      .element(page.getByRole("button", { name: "More (m)" }))
      .not.toBeDisabled();
  });

  it("renders the More button disabled when in fullscreen", async () => {
    await renderComponent({ isFullscreen: true });

    await expect
      .element(page.getByRole("button", { name: "More (m)" }))
      .toBeDisabled();
  });

  it("calls openDrawer when the More button is clicked", async () => {
    const user = userEvent.setup();

    await renderComponent({ isFullscreen: false });

    await user.click(page.getByRole("button", { name: "More (m)" }));

    expect(openDrawerSpy).toHaveBeenCalledOnce();
  });

  it("renders the Home link", async () => {
    await renderComponent();

    const homeLink = page.getByRole("link");

    expect(homeLink).toHaveAttribute("href", "/en-US");
  });
});
