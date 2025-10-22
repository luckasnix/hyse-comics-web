import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

import { comicPanelsMock } from "~/mocks/comics";

export const Route = createFileRoute("/api/comics/$comicId/pages/{-$pageId}")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { comicId, pageId } = params;
        if (!pageId) {
          const pages = comicPanelsMock.filter(
            (panel) => panel.comicId === comicId,
          );
          return json(pages);
        }
        const page = comicPanelsMock.find(
          (panel) => panel.comicId === comicId && panel.id === pageId,
        );
        if (!page) {
          return new Response(JSON.stringify({ message: "Page not found" }), {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        return json(page);
      },
    },
  },
});
