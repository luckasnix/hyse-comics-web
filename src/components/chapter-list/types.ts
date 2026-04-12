import type { Chapter } from "#/types/comics";

export type ChapterListProps = Readonly<{
  chapters: Array<Chapter>;
  selectedChapterId: string | null;
  onChapterClick: (chapterId: string) => void;
}>;
