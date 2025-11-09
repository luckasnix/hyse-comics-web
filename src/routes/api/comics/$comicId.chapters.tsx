import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { comicChaptersMock } from "~/mocks/comics";

export const Route = createFileRoute("/api/comics/$comicId/chapters")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { comicId } = params;

        const chapters = comicChaptersMock.filter(
          (chapter) => chapter.comicId === comicId,
        );

        return json(chapters);
      },
    },
  },
});
