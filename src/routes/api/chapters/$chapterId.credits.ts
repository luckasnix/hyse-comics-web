import { createFileRoute } from "@tanstack/react-router";

import { creditsMock } from "#/mocks/comics";
import { usersMock } from "#/mocks/users";
import type { CreditWithUser } from "#/types/comics";

export const Route = createFileRoute("/api/chapters/$chapterId/credits")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { chapterId } = params;

        const credits: Array<CreditWithUser> = creditsMock
          .filter((currentCredit) => currentCredit.chapterId === chapterId)
          .map((currentCredit) => {
            const user = usersMock.find(
              (currentUser) => currentUser.profile.id === currentCredit.userId,
            );

            if (!user) {
              return null;
            }

            return {
              user: user.profile,
              role: currentCredit.role,
            };
          })
          .filter((currentCredit) => currentCredit !== null);

        if (!credits.length) {
          return Response.json(
            { message: "Credits not found" },
            { status: 404 },
          );
        }

        return Response.json(credits);
      },
    },
  },
});
