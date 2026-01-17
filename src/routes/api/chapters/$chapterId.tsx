import { createFileRoute } from "@tanstack/react-router";

import { chaptersMock } from "#/mocks/comics";

export const Route = createFileRoute("/api/chapters/$chapterId")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { chapterId } = params;

        const chapter = chaptersMock.find(
          (currentChapter) => currentChapter.id === chapterId,
        );

        if (!chapter) {
          return Response.json(
            { message: "Chapter not found" },
            { status: 404 },
          );
        }

        return Response.json(chapter);
      },
    },
  },
});
