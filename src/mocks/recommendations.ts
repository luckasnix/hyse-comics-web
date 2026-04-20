import type { ChapterWithComic, Recommendation } from "#/types/comics";

import { chaptersMock, comicsMock } from "./comics";

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

export const recommendationsMock: Array<Recommendation> = [
  {
    id: "trending-now",
    title: "Trending now",
    chapters: generateChaptersWithComic([
      "3URztCal8w",
      "8n86aCriNv",
      "mduaZ9Iu3k",
      "h4Ot0UrDfB",
      "ppgL2CuVHR",
      "LlAkuYOs5J",
    ]),
  },
  {
    id: "continue-reading",
    title: "Continue reading",
    chapters: generateChaptersWithComic([
      "3URztCal8w",
      "8n86aCriNv",
      "mduaZ9Iu3k",
      "h4Ot0UrDfB",
      "ppgL2CuVHR",
      "LlAkuYOs5J",
    ]),
  },
];
