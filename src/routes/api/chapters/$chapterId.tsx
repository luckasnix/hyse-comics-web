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
          return new Response(
            JSON.stringify({ message: "Chapter not found" }),
            {
              status: 404,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }

        return json(chapter);
      },
    },
  },
});
