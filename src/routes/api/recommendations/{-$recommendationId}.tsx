import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { chaptersMock, comicsMock } from "~/mocks/comics";
import type { ChapterWithComic, Recommendation } from "~/types/comics";

const generateChaptersWithComic = (
  chapterIds: Array<string>,
): Array<ChapterWithComic> =>
  chapterIds
    .map((chapterId) => {
      const chapter = chaptersMock.find((chapter) => chapter.id === chapterId);
      if (!chapter) {
        return null;
      }
      const comic = comicsMock.find((comic) => comic.id === chapter.comicId);
      if (!comic) {
        return null;
      }

      return {
        ...chapter,
        comic,
      };
    })
    .filter((chapter) => chapter !== null);

const recommendations: Array<Recommendation> = [
  {
    id: "trending-now",
    title: "Trending now",
    chapters: generateChaptersWithComic([
      "vNH8ZOb8",
      "Uxg6G2c4",
      "KoEb6BNw",
      "cFCqsYye",
      "awI4jabe",
      "ocxHyVie",
    ]),
  },
  {
    id: "continue-reading",
    title: "Continue reading",
    chapters: generateChaptersWithComic([
      "vNH8ZOb8",
      "Uxg6G2c4",
      "KoEb6BNw",
      "cFCqsYye",
      "awI4jabe",
      "ocxHyVie",
    ]),
  },
];

export const Route = createFileRoute(
  "/api/recommendations/{-$recommendationId}",
)({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { recommendationId } = params;

        if (recommendationId) {
          const recommendation = recommendations.find(
            (currentRecommendation) =>
              currentRecommendation.id === recommendationId,
          );

          if (!recommendation) {
            return json(
              { message: "Recommendation not found" },
              { status: 404 },
            );
          }

          return json(recommendation);
        }

        return json(recommendations);
      },
    },
  },
});
