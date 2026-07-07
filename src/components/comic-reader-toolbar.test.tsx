// @vitest-environment jsdom

import { useHotkey } from "@tanstack/react-hotkeys";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ComicProvider } from "#/contexts/comic";
import { chaptersMock, comicsMock, pagesMock } from "#/mocks/comics";

import {
  ComicReaderToolbar,
  type ComicReaderToolbarProps,
} from "./comic-reader-toolbar";

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

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("<ComicReaderToolbar />", () => {
  it("renders the page counter with placeholders when carousel is not ready", () => {
    renderComponent();

    expect(screen.getByText("? / ?")).toBeInTheDocument();
  });

  it("renders all eight toolbar buttons", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(8);
  });

  it("renders the navigation buttons with RTL labels for an eastern-direction comic", () => {
    renderComponent();

    expect(
      screen.getByRole("button", { name: "Last page (shift + ←)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next page (←)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Previous page (→)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "First page (shift + →)" }),
    ).toBeInTheDocument();
  });

  it("renders the navigation buttons with LTR labels for a western-direction comic", () => {
    const westernComic = comicsMock[1];

    render(
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

    expect(
      screen.getByRole("button", { name: "First page (shift + ←)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Previous page (←)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next page (→)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Last page (shift + →)" }),
    ).toBeInTheDocument();
  });

  it("disables all navigation buttons when carousel is not ready", () => {
    renderComponent();

    expect(
      screen.getByRole("button", { name: "Last page (shift + ←)" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Next page (←)" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Previous page (→)" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "First page (shift + →)" }),
    ).toBeDisabled();
  });

  it("renders the enter fullscreen button when not in fullscreen", () => {
    renderComponent({ isFullscreen: false });

    expect(
      screen.getByRole("button", { name: "Enter fullscreen (f)" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Exit fullscreen (f)" }),
    ).not.toBeInTheDocument();
  });

  it("renders the exit fullscreen button when in fullscreen", () => {
    renderComponent({ isFullscreen: true });

    expect(
      screen.getByRole("button", { name: "Exit fullscreen (f)" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Enter fullscreen (f)" }),
    ).not.toBeInTheDocument();
  });

  it("renders the Zoom button before the fullscreen button", () => {
    renderComponent({ isFullscreen: false });

    const endButtons = screen.getAllByRole("button").slice(-3);

    expect(
      endButtons.map((button) => button.getAttribute("aria-label")),
    ).toEqual(["Zoom (z)", "Enter fullscreen (f)", "More (m)"]);
  });

  it("marks the Zoom button as inactive when zoom is disabled", () => {
    renderComponent({ isZoomEnabled: false });

    expect(screen.getByRole("button", { name: "Zoom (z)" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("marks the Zoom button as active when zoom is enabled", () => {
    renderComponent({ isZoomEnabled: true });

    expect(screen.getByRole("button", { name: "Zoom (z)" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("calls toggleZoom when the Zoom button is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Zoom (z)" }));

    expect(toggleZoomSpy).toHaveBeenCalledOnce();
  });

  it("registers a keyboard shortcut for zoom", () => {
    renderComponent();

    expect(vi.mocked(useHotkey)).toHaveBeenCalledWith("Z", toggleZoomSpy);
  });

  it("calls enterFullscreen when the enter fullscreen button is clicked", async () => {
    const user = userEvent.setup();

    renderComponent({ isFullscreen: false });

    await user.click(
      screen.getByRole("button", { name: "Enter fullscreen (f)" }),
    );

    expect(enterFullscreenSpy).toHaveBeenCalledOnce();
  });

  it("calls exitFullscreen when the exit fullscreen button is clicked", async () => {
    const user = userEvent.setup();

    renderComponent({ isFullscreen: true });

    await user.click(
      screen.getByRole("button", { name: "Exit fullscreen (f)" }),
    );

    expect(exitFullscreenSpy).toHaveBeenCalledOnce();
  });

  it("renders the More button enabled when not in fullscreen", () => {
    renderComponent({ isFullscreen: false });

    expect(screen.getByRole("button", { name: "More (m)" })).not.toBeDisabled();
  });

  it("renders the More button disabled when in fullscreen", () => {
    renderComponent({ isFullscreen: true });

    expect(screen.getByRole("button", { name: "More (m)" })).toBeDisabled();
  });

  it("calls openDrawer when the More button is clicked", async () => {
    const user = userEvent.setup();

    renderComponent({ isFullscreen: false });

    await user.click(screen.getByRole("button", { name: "More (m)" }));

    expect(openDrawerSpy).toHaveBeenCalledOnce();
  });

  it("renders the Home link", () => {
    renderComponent();

    const homeLink = screen.getByRole("link");

    expect(homeLink).toHaveAttribute("href", "/en-US");
  });
});
