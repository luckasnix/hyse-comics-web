import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { comicChaptersMock } from "~/mocks/comics";

export const Route = createFileRoute("/api/chapters/$chapterId")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { chapterId } = params;

        const chapter = comicChaptersMock.find(
          (currentChapter) => currentChapter.id === chapterId,
        );

        if (!chapter) {
          return json({ message: "Chapter not found" }, { status: 404 });
        }

        return json(chapter);
      },
    },
  },
});
