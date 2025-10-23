import { createFileRoute } from "@tanstack/react-router";

import { ComicReaderSection } from "~/sections/comic-reader-section";
import { getComic, getComicPages } from "~/services/comics";

const ComicsRoute = () => {
  // TODO: Show an error component if there was one in the loader data
  const { comic, comicPages } = Route.useLoaderData();

  return <ComicReaderSection comic={comic} comicPages={comicPages} />;
};

export const Route = createFileRoute("/comics/$comicId")({
  component: ComicsRoute,
  loader: async ({ params: { comicId } }) => {
    // TODO: Handle errors that may occur in the request
    const [comic, comicPages] = await Promise.all([
      getComic(comicId),
      getComicPages(comicId),
    ]);

    return {
      comic,
      comicPages,
    };
  },
});
