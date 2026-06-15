// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { chaptersMock, comicsMock, pagesMock } from "#/mocks/comics";

import { ComicProvider, useComic } from "./comic";

const comic = comicsMock[0];
const chapters = chaptersMock.slice(0, 2);
const pages = pagesMock.slice(0, 3);

const wrapper = ({ children }: { children: ReactNode }) => (
  <ComicProvider
    comic={comic}
    chapters={chapters}
    pages={pages}
    currentComicId={comic.id}
    currentChapterId={chapters[0].id}
  >
    {children}
  </ComicProvider>
);

describe("ComicContext", () => {
  it("provides the comic context value through ComicProvider", () => {
    const { result } = renderHook(() => useComic(), { wrapper });

    expect(result.current).toEqual({
      comic,
      chapters,
      pages,
      currentComicId: comic.id,
      currentChapterId: chapters[0].id,
    });
    expect(result.current.comic).toBe(comic);
    expect(result.current.chapters).toBe(chapters);
    expect(result.current.pages).toBe(pages);
  });

  it("throws when accessed outside ComicProvider", () => {
    expect(() => renderHook(() => useComic())).toThrow(
      "The hook 'useComic' must be used inside 'ComicProvider'.",
    );
  });
});
