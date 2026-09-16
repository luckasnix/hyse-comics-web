import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { chaptersMock } from "#/mocks/comics.ts";

import { ChapterList } from "./chapter-list.tsx";

afterEach(cleanup);

const chapters = chaptersMock.slice(0, 2);

const onChapterClickSpy = vi.fn();

describe("<ChapterList />", () => {
  it("renders the empty state when there are no chapters", async () => {
    await render(
      <ChapterList
        chapters={[]}
        selectedChapterId={null}
        onChapterClick={onChapterClickSpy}
      />,
    );

    await expect
      .element(page.getByText("No chapters found"))
      .toBeInTheDocument();
  });

  it("renders the chapter titles and synopses", async () => {
    await render(
      <ChapterList
        chapters={chapters}
        selectedChapterId={null}
        onChapterClick={onChapterClickSpy}
      />,
    );

    for (const chapter of chapters) {
      await expect.element(page.getByText(chapter.title)).toBeInTheDocument();
      await expect
        .element(page.getByText(chapter.synopsis))
        .toBeInTheDocument();
    }
  });

  it("highlights the selected chapter", async () => {
    const selectedId = chapters[1].id;

    await render(
      <ChapterList
        chapters={chapters}
        selectedChapterId={selectedId}
        onChapterClick={onChapterClickSpy}
      />,
    );

    const listItems = page.getByRole("button").elements();

    expect(listItems[1]).toHaveClass("Mui-selected");
  });

  it("calls onChapterClick with the chapter ID when a chapter is clicked", async () => {
    const user = userEvent.setup();

    await render(
      <ChapterList
        chapters={chapters}
        selectedChapterId={null}
        onChapterClick={onChapterClickSpy}
      />,
    );

    await user.click(page.getByText(chapters[0].title));

    expect(onChapterClickSpy).toHaveBeenCalledWith(chapters[0].id);

    await user.click(page.getByText(chapters[1].title));

    expect(onChapterClickSpy).toHaveBeenCalledWith(chapters[1].id);
  });
});
