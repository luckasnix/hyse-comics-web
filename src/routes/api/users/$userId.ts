import { createFileRoute } from "@tanstack/react-router";

import { usersMock } from "#/mocks/users";

export const Route = createFileRoute("/api/users/$userId")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { userId } = params;

        const chapter = usersMock.find(
          (currentUser) => currentUser.profile.id === userId,
        );

        if (!chapter) {
          return Response.json({ message: "User not found" }, { status: 404 });
        }

        return Response.json(chapter);
      },
    },
  },
});
