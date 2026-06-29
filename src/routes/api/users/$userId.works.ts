import { createFileRoute } from "@tanstack/react-router";

import { chaptersMock, comicsMock, creditsMock } from "#/mocks/comics";
import { usersMock } from "#/mocks/users";
import type { UserComicWork } from "#/types/comics";
import type { UserRoles } from "#/types/users";

export const Route = createFileRoute("/api/users/$userId/works")({
  server: {
    handlers: {
      // TODO: Connect to Supabase and fetch data from there
      GET: async ({ params }) => {
        const { userId } = params;

        const user = usersMock.find(
          (currentUser) => currentUser.profile.id === userId,
        );

        if (!user) {
          return Response.json({ message: "User not found" }, { status: 404 });
        }

        const rolesByComicId = creditsMock.reduce(
          (currentRolesByComicId, currentCredit) => {
            if (currentCredit.userId !== userId) {
              return currentRolesByComicId;
            }

            const chapter = chaptersMock.find(
              (currentChapter) => currentChapter.id === currentCredit.chapterId,
            );

            if (!chapter) {
              return currentRolesByComicId;
            }

            const currentRoles =
              currentRolesByComicId.get(chapter.comicId) ??
              new Set<UserRoles>();

            for (const role of currentCredit.roles) {
              currentRoles.add(role);
            }

            currentRolesByComicId.set(chapter.comicId, currentRoles);

            return currentRolesByComicId;
          },
          new Map<string, Set<UserRoles>>(),
        );

        const works: Array<UserComicWork> = comicsMock
          .map((comic) => {
            const roles = rolesByComicId.get(comic.id);

            if (!roles) {
              return null;
            }

            return {
              comic,
              roles: Array.from(roles),
            };
          })
          .filter((currentWork) => currentWork !== null);

        return Response.json(works);
      },
    },
  },
});
