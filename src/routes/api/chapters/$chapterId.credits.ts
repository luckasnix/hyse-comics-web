import { createFileRoute } from "@tanstack/react-router";

import { creditsMock } from "#/mocks/comics.ts";
import { usersMock } from "#/mocks/users.ts";
import type { CreditWithUser } from "#/types/comics.ts";

export const Route = createFileRoute("/api/chapters/$chapterId/credits")({
  server: {
    handlers: {
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
              roles: currentCredit.roles,
            };
          })
          .filter((currentCredit) => currentCredit !== null);

        return Response.json(credits);
      },
    },
  },
});
