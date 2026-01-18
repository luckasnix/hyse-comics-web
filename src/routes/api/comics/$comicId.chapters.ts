import { createFileRoute } from "@tanstack/react-router";

import { chaptersMock } from "#/mocks/comics";

export const Route = createFileRoute("/api/comics/$comicId/chapters")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { comicId } = params;

        const chapters = chaptersMock.filter(
          (currentChapter) => currentChapter.comicId === comicId,
        );

        return Response.json(chapters);
      },
    },
  },
});
