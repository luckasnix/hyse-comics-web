// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ComicProvider } from "#/contexts/comic/provider";
import { chaptersMock, comicsMock, pagesMock } from "#/mocks/comics";

import { ComicReaderToolbar } from "./component";
import type { ComicReaderToolbarProps } from "./types";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
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
const openDrawerSpy = vi.fn();
const toggleDrawerSpy = vi.fn();

const defaultProps: ComicReaderToolbarProps = {
  carouselApi: undefined,
  isFullscreen: false,
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

afterEach(cleanup);

describe("<ComicReaderToolbar />", () => {
  it("renders the page counter with placeholders when carousel is not ready", () => {
    renderComponent();

    expect(screen.getByText("? / ?")).toBeInTheDocument();
  });

  it("renders all seven toolbar buttons", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(7);
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

    expect(homeLink).toHaveAttribute("href", "/");
  });
});
