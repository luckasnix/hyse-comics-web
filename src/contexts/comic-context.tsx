import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

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

export const ComicContext = createContext<ComicContextValue | null>(null);

export const ComicProvider = ({
  children,
  comic,
  chapters,
  pages,
  currentComicId,
  currentChapterId,
}: ComicProviderProps) => {
  const value = useMemo(
    () => ({
      comic,
      chapters,
      pages,
      currentComicId,
      currentChapterId,
    }),
    [comic, chapters, pages, currentComicId, currentChapterId],
  );

  return (
    <ComicContext.Provider value={value}>{children}</ComicContext.Provider>
  );
};

export const useComic = () => {
  const context = useContext(ComicContext);

  if (!context) {
    throw new Error("The hook 'useComic' must be used inside 'ComicProvider'.");
  }

  return context;
};
