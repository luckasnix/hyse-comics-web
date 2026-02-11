import { createFileRoute } from "@tanstack/react-router";

import { UserOverview } from "#/components/user-overview";
import { PageLayout } from "#/layouts/page-layout";
import { getUser } from "#/services/users";

const UserRoute = () => {
  const { user } = Route.useLoaderData();

  return (
    <PageLayout>
      <UserOverview
        username={user.profile.username}
        displayName={user.profile.displayName}
        avatarUrl={user.profile.avatarUrl}
        coverUrl={user.profile.coverUrl}
      />
    </PageLayout>
  );
};

export const Route = createFileRoute("/users/$userId")({
  component: UserRoute,
  loader: async ({ params: { userId } }) => {
    const user = await getUser(userId);

    return {
      user,
    };
  },
});
