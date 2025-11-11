import { createFileRoute } from "@tanstack/react-router";

import { ComicProvider } from "~/contexts/comic-context";
import { ComicReaderSection } from "~/sections/comic-reader-section";
import {
  getComic,
  getComicChapter,
  getComicChapters,
  getComicPages,
} from "~/services/comics";

const ComicChapterRoute = () => {
  // TODO: Show an error component if there was one in the loader data
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
  component: ComicChapterRoute,
  loader: async ({ params: { chapterId } }) => {
    // TODO: Handle errors that may occur in the request
    const chapter = await getComicChapter(chapterId);
    const [comic, chapters, pages] = await Promise.all([
      getComic(chapter.comicId),
      getComicChapters(chapter.comicId),
      getComicPages(chapterId),
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
