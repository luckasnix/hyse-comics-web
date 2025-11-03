import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

import type { Comic, ComicChapter, ComicPage } from "~/types/comics";

export type ComicContextValue = {
  comic: Comic;
  comicChapters: Array<ComicChapter>;
  comicPages: Array<ComicPage>;
  currentComicId: string;
  currentComicChapterId: string;
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
  comicChapters,
  comicPages,
  currentComicId,
  currentComicChapterId,
}: ComicProviderProps) => {
  const value = useMemo(
    () => ({
      comic,
      comicChapters,
      comicPages,
      currentComicId,
      currentComicChapterId,
    }),
    [comic, comicChapters, comicPages, currentComicId, currentComicChapterId],
  );

  return (
    <ComicContext.Provider value={value}>{children}</ComicContext.Provider>
  );
};

export const useComicContext = () => {
  const context = useContext(ComicContext);

  if (!context) {
    throw new Error(
      "The hook 'useComicContext' must be used inside 'ComicProvider'.",
    );
  }

  return context;
};
