import { useMemo } from "react";

import { ComicContext } from "./context";
import type { ComicProviderProps } from "./types";

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
