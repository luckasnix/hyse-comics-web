import { createFileRoute } from "@tanstack/react-router";

import { ComicReaderSection } from "~/sections/comic-reader-section";
import { getComic, getComicChapters, getComicPages } from "~/services/comics";

const ComicChaptersRoute = () => {
  // TODO: Show an error component if there was one in the loader data
  const { comic, comicChapters, comicPages } = Route.useLoaderData();

  return (
    <ComicReaderSection
      comic={comic}
      comicChapters={comicChapters}
      comicPages={comicPages}
    />
  );
};

export const Route = createFileRoute("/comics/$comicId/chapters/$chapterId")({
  component: ComicChaptersRoute,
  loader: async ({ params: { comicId, chapterId } }) => {
    // TODO: Handle errors that may occur in the request
    const [comic, comicChapters, comicPages] = await Promise.all([
      getComic(comicId),
      getComicChapters(comicId),
      getComicPages(comicId, chapterId),
    ]);

    return {
      comic,
      comicChapters,
      comicPages,
    };
  },
});
