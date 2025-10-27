import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { comicPagesMock } from "~/mocks/comics";

export const Route = createFileRoute("/api/comics/$comicId/pages/{-$pageId}")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { comicId, pageId } = params;
        if (!pageId) {
          const comicPages = comicPagesMock.filter(
            (currentComicPage) => currentComicPage.comicId === comicId,
          );
          return json(comicPages);
        }
        const comicPage = comicPagesMock.find(
          (currentComicPage) =>
            currentComicPage.comicId === comicId &&
            currentComicPage.id === pageId,
        );
        if (!comicPage) {
          return new Response(
            JSON.stringify({ message: "Comic page not found" }),
            {
              status: 404,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }

        return json(comicPage);
      },
    },
  },
});
