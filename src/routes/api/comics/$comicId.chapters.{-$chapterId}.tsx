import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { comicChaptersMock } from "~/mocks/comics";

export const Route = createFileRoute(
  "/api/comics/$comicId/chapters/{-$chapterId}",
)({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { comicId, chapterId } = params;

        if (!chapterId) {
          const chapters = comicChaptersMock.filter(
            (chapter) => chapter.comicId === comicId,
          );
          return json(chapters);
        }

        const chapter = comicChaptersMock.find(
          (currentChapter) =>
            currentChapter.comicId === comicId &&
            currentChapter.id === chapterId,
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
