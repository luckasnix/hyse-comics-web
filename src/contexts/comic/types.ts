import type { ReactNode } from "react";

import type { Chapter, Comic, Page } from "#/types/comics";

export type ComicContextValue = {
  comic: Comic;
  chapters: Array<Chapter>;
  pages: Array<Page>;
  currentComicId: string | null;
  currentChapterId: string | null;
};

export type ComicProviderProps = Readonly<
  ComicContextValue & {
    children: ReactNode;
  }
>;
