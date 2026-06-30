import { createFileRoute } from "@tanstack/react-router";

import { chaptersMock, creditsMock } from "#/mocks/comics";
import { usersMock } from "#/mocks/users";
import type { CreditWithUser } from "#/types/comics";
import type { UserRoles } from "#/types/users";

export const Route = createFileRoute("/api/comics/$comicId/credits")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { comicId } = params;

        const chapterIds = new Set(
          chaptersMock
            .filter((currentChapter) => currentChapter.comicId === comicId)
            .map((currentChapter) => currentChapter.id),
        );

        const rolesByUserId = creditsMock.reduce(
          (currentRolesByUserId, currentCredit) => {
            if (!chapterIds.has(currentCredit.chapterId)) {
              return currentRolesByUserId;
            }

            const currentRoles =
              currentRolesByUserId.get(currentCredit.userId) ??
              new Set<UserRoles>();

            for (const role of currentCredit.roles) {
              currentRoles.add(role);
            }

            currentRolesByUserId.set(currentCredit.userId, currentRoles);

            return currentRolesByUserId;
          },
          new Map<string, Set<UserRoles>>(),
        );

        const credits: Array<CreditWithUser> = Array.from(
          rolesByUserId.entries(),
        )
          .map(([userId, roles]) => {
            const user = usersMock.find(
              (currentUser) => currentUser.profile.id === userId,
            );

            if (!user) {
              return null;
            }

            return {
              user: user.profile,
              roles: Array.from(roles),
            };
          })
          .filter((currentCredit) => currentCredit !== null);

        return Response.json(credits);
      },
    },
  },
});
