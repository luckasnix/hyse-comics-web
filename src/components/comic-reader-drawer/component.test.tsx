// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ComicProvider } from "#/contexts/comic/provider";
import { chaptersMock, comicsMock, creditsWithUserMock } from "#/mocks/comics";

import { ComicReaderDrawer } from "./component";
import type { ComicReaderDrawerProps } from "./types";

const navigateSpy = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => navigateSpy,
}));

vi.mock("#/services/comics", () => ({
  getChapterCredits: vi.fn().mockResolvedValue(creditsWithUserMock),
}));

const { getChapterCredits } = await import("#/services/comics");

const getChapterCreditsMock = vi.mocked(getChapterCredits);

const comic = comicsMock[1];
const chapters = chaptersMock.filter((chapter) => chapter.comicId === comic.id);

const onCloseSpy = vi.fn();

const defaultProps: ComicReaderDrawerProps = {
  isOpen: true,
  onClose: onCloseSpy,
};

const renderComponent = (
  overrides: Partial<ComicReaderDrawerProps> = {},
  {
    currentChapterId = chapters[0].id,
    chapterCredits = creditsWithUserMock,
  }: {
    currentChapterId?: string | null;
    chapterCredits?: typeof creditsWithUserMock;
  } = {},
) => {
  navigateSpy.mockClear();
  getChapterCreditsMock.mockClear();
  getChapterCreditsMock.mockResolvedValue(chapterCredits);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ComicProvider
        comic={comic}
        chapters={chapters}
        pages={[]}
        currentComicId={comic.id}
        currentChapterId={currentChapterId}
      >
        <ComicReaderDrawer {...defaultProps} {...overrides} />
      </ComicProvider>
    </QueryClientProvider>,
  );
};

afterEach(cleanup);

describe("<ComicReaderDrawer />", () => {
  it("renders the close button, comic title and synopsis", () => {
    renderComponent();

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    expect(screen.getByText(comic.title)).toBeInTheDocument();
    expect(screen.getByText(comic.synopsis)).toBeInTheDocument();
  });

  it("renders the chapter list", () => {
    renderComponent();

    for (const chapter of chapters) {
      expect(screen.getByText(chapter.title)).toBeInTheDocument();
    }
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(onCloseSpy).toHaveBeenCalledOnce();
  });

  it("requests credits for the current chapter", async () => {
    renderComponent();

    await waitFor(() => {
      expect(getChapterCreditsMock).toHaveBeenCalledWith(chapters[0].id);
    });
  });

  it("does not request credits when there is no current chapter", () => {
    renderComponent({}, { currentChapterId: null });

    expect(getChapterCreditsMock).not.toHaveBeenCalled();
  });

  it("renders the credit list when the Credits tab is selected", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("tab", { name: "Credits" }));

    expect(await screen.findByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("Writer")).toBeInTheDocument();
  });

  it("navigates to the selected chapter when a chapter is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByText(chapters[1].title));

    expect(navigateSpy).toHaveBeenCalledWith({
      to: "/chapters/$chapterId",
      params: { chapterId: chapters[1].id },
    });
  });

  it("navigates to the selected user when a credit is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("tab", { name: "Credits" }));
    await user.click(await screen.findByText("@johndoe"));

    expect(navigateSpy).toHaveBeenCalledWith({
      to: "/users/$userId",
      params: { userId: creditsWithUserMock[0].user.id },
    });
  });
});
