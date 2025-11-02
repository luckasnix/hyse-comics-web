import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { comicChaptersMock, comicsMock } from "~/mocks/comics";
import type {
  Comic,
  ComicChapter,
  ComicChapterWithComic,
  ComicRecommendation,
} from "~/types/comics";

const generateComicChaptersWithComic = (
  comicChapters: Array<ComicChapter>,
  comics: Array<Comic>,
): Array<ComicChapterWithComic> => {
  return comicChapters
    .map((comicChapter) => {
      const comic = comics.find((comic) => comic.id === comicChapter.comicId);
      if (!comic) return null;
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
        const comicChaptersWithComic = generateComicChaptersWithComic(
          comicChaptersMock,
          comicsMock,
        );

        const comicRecommendations: Array<ComicRecommendation> = [
          {
            id: "aiEFHUOj",
            title: "Trending now",
            items: comicChaptersWithComic,
          },
          {
            id: "JASVe5Aj",
            title: "Continue reading",
            items: comicChaptersWithComic,
          },
        ];

        return json(comicRecommendations);
      },
    },
  },
});
