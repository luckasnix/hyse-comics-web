import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { comicChaptersMock, comicsMock } from "~/mocks/comics";
import type {
  ComicChapterWithComic,
  ComicRecommendation,
} from "~/types/comics";

const generateComicChaptersWithComic = (
  chapterIds: Array<string>,
): Array<ComicChapterWithComic> => {
  return chapterIds
    .map((chapterId) => {
      const comicChapter = comicChaptersMock.find(
        (chapter) => chapter.id === chapterId,
      );
      if (!comicChapter) {
        return null;
      }
      const comic = comicsMock.find(
        (comic) => comic.id === comicChapter.comicId,
      );
      if (!comic) {
        return null;
      }

      return {
        ...comicChapter,
        comic,
      };
    })
    .filter((chapter) => chapter !== null);
};

export const Route = createFileRoute("/api/comics/recommendations")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async () => {
        const comicRecommendations: Array<ComicRecommendation> = [
          {
            id: "aiEFHUOj",
            title: "Trending now",
            items: generateComicChaptersWithComic([
              "vNH8ZOb8",
              "Uxg6G2c4",
              "KoEb6BNw",
              "cFCqsYye",
              "awI4jabe",
              "ocxHyVie",
            ]),
          },
          {
            id: "JASVe5Aj",
            title: "Continue reading",
            items: generateComicChaptersWithComic([
              "vNH8ZOb8",
              "Uxg6G2c4",
              "KoEb6BNw",
              "cFCqsYye",
              "awI4jabe",
              "ocxHyVie",
            ]),
          },
        ];

        return json(comicRecommendations);
      },
    },
  },
});
