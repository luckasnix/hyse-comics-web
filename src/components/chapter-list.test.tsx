// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { chaptersMock } from "#/mocks/comics";

import { ChapterList } from "./chapter-list";

afterEach(cleanup);

const chapters = chaptersMock.slice(0, 2);

const onChapterClickSpy = vi.fn();

describe("<ChapterList />", () => {
  it("renders the empty state when there are no chapters", () => {
    render(
      <ChapterList
        chapters={[]}
        selectedChapterId={null}
        onChapterClick={onChapterClickSpy}
      />,
    );

    expect(screen.getByText("No chapters found")).toBeInTheDocument();
  });

  it("renders the chapter titles and synopses", () => {
    render(
      <ChapterList
        chapters={chapters}
        selectedChapterId={null}
        onChapterClick={onChapterClickSpy}
      />,
    );

    for (const chapter of chapters) {
      expect(screen.getByText(chapter.title)).toBeInTheDocument();
      expect(screen.getByText(chapter.synopsis)).toBeInTheDocument();
    }
  });

  it("highlights the selected chapter", () => {
    const selectedId = chapters[1].id;

    render(
      <ChapterList
        chapters={chapters}
        selectedChapterId={selectedId}
        onChapterClick={onChapterClickSpy}
      />,
    );

    const listItems = screen.getAllByRole("button");

    expect(listItems[1]).toHaveClass("Mui-selected");
  });

  it("calls onChapterClick with the chapter ID when a chapter is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ChapterList
        chapters={chapters}
        selectedChapterId={null}
        onChapterClick={onChapterClickSpy}
      />,
    );

    await user.click(screen.getByText(chapters[0].title));

    expect(onChapterClickSpy).toHaveBeenCalledWith(chapters[0].id);

    await user.click(screen.getByText(chapters[1].title));

    expect(onChapterClickSpy).toHaveBeenCalledWith(chapters[1].id);
  });
});
