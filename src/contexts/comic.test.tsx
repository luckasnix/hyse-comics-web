import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { renderHook } from "vitest-browser-react/pure";

import { chaptersMock, comicsMock, pagesMock } from "#/mocks/comics.ts";

import { ComicProvider, useComic } from "./comic.tsx";

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
  it("provides the comic context value through ComicProvider", async () => {
    const { result } = await renderHook(() => useComic(), { wrapper });

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

  it("throws when accessed outside ComicProvider", async () => {
    await expect(renderHook(() => useComic())).rejects.toThrow(
      "The hook 'useComic' must be used inside 'ComicProvider'.",
    );
  });
});
