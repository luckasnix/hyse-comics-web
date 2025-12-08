import { createFileRoute } from "@tanstack/react-router";

import { ComicProvider } from "#/contexts/comic-context";
import { ComicReaderSection } from "#/sections/comic-reader-section";
import { getChapter, getChapters, getComic, getPages } from "#/services/comics";

const ChapterRoute = () => {
  const { comic, chapters, pages, currentComicId, currentChapterId } =
    Route.useLoaderData();

  return (
    <ComicProvider
      comic={comic}
      chapters={chapters}
      pages={pages}
      currentComicId={currentComicId}
      currentChapterId={currentChapterId}
    >
      {/* A prop "key" is important here to isolate the carousel state during navigation between chapters. */}
      {/* When navigating between chapters, the "currentChapterId" changes, and this helps reset the pagination. */}
      <ComicReaderSection key={currentChapterId} />
    </ComicProvider>
  );
};

export const Route = createFileRoute("/chapters/$chapterId")({
  component: ChapterRoute,
  loader: async ({ params: { chapterId } }) => {
    const chapter = await getChapter(chapterId);
    const [comic, chapters, pages] = await Promise.all([
      getComic(chapter.comicId),
      getChapters(chapter.comicId),
      getPages(chapterId),
    ]);

    return {
      comic,
      chapters,
      pages,
      currentComicId: chapter.comicId,
      currentChapterId: chapterId,
    };
  },
});
