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
  const {
    comic,
    comicChapters,
    comicPages,
    currentComicId,
    currentComicChapterId,
  } = Route.useLoaderData();

  return (
    <ComicProvider
      comic={comic}
      comicChapters={comicChapters}
      comicPages={comicPages}
      currentComicId={currentComicId}
      currentComicChapterId={currentComicChapterId}
    >
      {/* A prop "key" is important here to isolate the carousel state during navigation between chapters. */}
      {/* When navigating between chapters, the "currentComicChapterId" changes, and this helps reset the pagination. */}
      <ComicReaderSection key={currentComicChapterId} />
    </ComicProvider>
  );
};

export const Route = createFileRoute("/chapters/$chapterId")({
  component: ComicChapterRoute,
  loader: async ({ params: { chapterId } }) => {
    // TODO: Handle errors that may occur in the request
    const comicChapter = await getComicChapter(chapterId);
    const [comic, comicChapters, comicPages] = await Promise.all([
      getComic(comicChapter.comicId),
      getComicChapters(comicChapter.comicId),
      getComicPages(chapterId),
    ]);

    return {
      comic,
      comicChapters,
      comicPages,
      currentComicId: comicChapter.comicId,
      currentComicChapterId: chapterId,
    };
  },
});
