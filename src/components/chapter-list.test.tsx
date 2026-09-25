import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { chaptersMock } from "#/mocks/comics.ts";

import { ChapterList } from "./chapter-list.tsx";

afterEach(cleanup);

const chapters = chaptersMock.slice(0, 2);

const onChapterClickSpy = vi.fn();

const getChapterItems = () =>
  page.getByRole("list").getByRole("button").elements();

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
    await expect
      .element(page.getByRole("button", { name: "Reverse order" }))
      .not.toBeInTheDocument();
  });

  it("does not show the reverse button for one chapter", async () => {
    await render(
      <ChapterList
        chapters={[chapters[0]]}
        selectedChapterId={null}
        onChapterClick={onChapterClickSpy}
      />,
    );

    await expect
      .element(page.getByRole("button", { name: "Reverse order" }))
      .not.toBeInTheDocument();
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

    expect(getChapterItems()[1]).toHaveClass("Mui-selected");
  });

  it("reverses and restores the chapters while preserving their numbers and input", async () => {
    const user = userEvent.setup();
    const originalIds = chapters.map((chapter) => chapter.id);

    await render(
      <ChapterList
        chapters={chapters}
        selectedChapterId={null}
        onChapterClick={onChapterClickSpy}
      />,
    );

    const reverseButton = page.getByRole("button", { name: "Reverse order" });
    const chapterTitles = () =>
      getChapterItems().map(
        (item) => item.querySelector(".MuiListItemText-primary")?.textContent,
      );
    const chapterNumbers = () =>
      getChapterItems().map(
        (item) => item.querySelector(".MuiAvatar-root")?.textContent,
      );

    expect(chapterTitles()).toEqual(chapters.map((chapter) => chapter.title));
    expect(chapterNumbers()).toEqual(["1", "2"]);
    await expect
      .element(reverseButton)
      .toHaveAttribute("aria-pressed", "false");

    await user.click(reverseButton);

    expect(chapterTitles()).toEqual(
      chapters.map((chapter) => chapter.title).reverse(),
    );
    expect(chapterNumbers()).toEqual(["2", "1"]);
    expect(chapters.map((chapter) => chapter.id)).toEqual(originalIds);
    await expect.element(reverseButton).toHaveAttribute("aria-pressed", "true");

    await user.click(reverseButton);

    expect(chapterTitles()).toEqual(chapters.map((chapter) => chapter.title));
    expect(chapterNumbers()).toEqual(["1", "2"]);
    await expect
      .element(reverseButton)
      .toHaveAttribute("aria-pressed", "false");
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

  it("keeps selection and click targets after reversing the chapters", async () => {
    const user = userEvent.setup();

    await render(
      <ChapterList
        chapters={chapters}
        selectedChapterId={chapters[1].id}
        onChapterClick={onChapterClickSpy}
      />,
    );

    await user.click(page.getByRole("button", { name: "Reverse order" }));

    expect(getChapterItems()[0]).toHaveClass("Mui-selected");

    await user.click(page.getByText(chapters[1].title));

    expect(onChapterClickSpy).toHaveBeenLastCalledWith(chapters[1].id);
  });
});
