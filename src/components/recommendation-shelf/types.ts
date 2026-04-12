import type { ChapterWithComic } from "#/types/comics";

export type RecommendationShelfProps = Readonly<{
  title: string;
  chapters: Array<ChapterWithComic>;
}>;
