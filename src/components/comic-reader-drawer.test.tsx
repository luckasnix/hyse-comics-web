// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ComicProvider } from "#/contexts/comic";
import { chaptersMock, comicsMock, creditsWithUserMock } from "#/mocks/comics";
import type { CreditWithUser } from "#/types/comics";

import {
  ComicReaderDrawer,
  type ComicReaderDrawerProps,
} from "./comic-reader-drawer";

const navigateSpy = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => navigateSpy,
  useParams: () => ({ locale: "en-US" }),
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
    chapterCreditsError = null,
    keepChapterCreditsPending = false,
  }: {
    currentChapterId?: string | null;
    chapterCredits?: Array<CreditWithUser>;
    chapterCreditsError?: Error | null;
    keepChapterCreditsPending?: boolean;
  } = {},
) => {
  navigateSpy.mockClear();
  getChapterCreditsMock.mockClear();

  if (keepChapterCreditsPending) {
    getChapterCreditsMock.mockReturnValue(new Promise(() => undefined));
  } else if (chapterCreditsError) {
    getChapterCreditsMock.mockRejectedValue(chapterCreditsError);
  } else {
    getChapterCreditsMock.mockResolvedValue(chapterCredits);
  }

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

  it("does not request credits when the drawer is closed", () => {
    renderComponent({ isOpen: false });

    expect(getChapterCreditsMock).not.toHaveBeenCalled();
  });

  it("renders an empty credit list when there is no current chapter", async () => {
    const user = userEvent.setup();

    renderComponent({}, { currentChapterId: null });

    await user.click(screen.getByRole("tab", { name: "Credits" }));

    expect(screen.getByText("No credits found")).toBeVisible();
  });

  it("renders the credit loading state while credits are pending", async () => {
    const user = userEvent.setup();

    renderComponent({}, { keepChapterCreditsPending: true });

    await user.click(screen.getByRole("tab", { name: "Credits" }));

    expect(screen.getByText("Loading credits...")).toBeVisible();
  });

  it("renders the credit error state when credits fail to load", async () => {
    const user = userEvent.setup();

    renderComponent(
      {},
      { chapterCreditsError: new Error("Failed to fetch credits") },
    );

    await user.click(screen.getByRole("tab", { name: "Credits" }));

    expect(await screen.findByText("Failed to load credits.")).toBeVisible();
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
      to: "/{-$locale}/chapters/$chapterId",
      params: { locale: "en-US", chapterId: chapters[1].id },
    });
  });

  it("navigates to the selected user when a credit is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("tab", { name: "Credits" }));
    await user.click(await screen.findByText("@johndoe"));

    expect(navigateSpy).toHaveBeenCalledWith({
      to: "/{-$locale}/users/$userId",
      params: { locale: "en-US", userId: creditsWithUserMock[0].user.id },
    });
  });
});
