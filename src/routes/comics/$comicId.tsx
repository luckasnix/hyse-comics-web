import { createFileRoute } from "@tanstack/react-router";

import { ComicReaderSection } from "~/sections/comic-reader-section";
import { getComic, getComicChapters, getComicPages } from "~/services/comics";

const ComicsRoute = () => {
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

export const Route = createFileRoute("/comics/$comicId")({
  component: ComicsRoute,
  loader: async ({ params: { comicId } }) => {
    // TODO: Handle errors that may occur in the request
    const [comic, comicChapters] = await Promise.all([
      getComic(comicId),
      getComicChapters(comicId),
    ]);

    const comicPages = await getComicPages(comicId, comicChapters[0].id);

    return {
      comic,
      comicChapters,
      comicPages,
    };
  },
});
