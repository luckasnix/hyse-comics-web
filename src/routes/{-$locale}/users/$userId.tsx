import { createFileRoute } from "@tanstack/react-router";

import { PageLayout } from "#/layouts/page-layout";
import { UserOverviewSection } from "#/sections/user-overview-section";
import { UserWorksSection } from "#/sections/user-works-section";
import { getUser, getUserWorks } from "#/services/users";

const UserRoute = () => {
  const { user, works } = Route.useLoaderData();

  return (
    <PageLayout>
      <UserOverviewSection
        username={user.profile.username}
        displayName={user.profile.displayName}
        avatarUrl={user.profile.avatarUrl}
        coverUrl={user.profile.coverUrl}
        socialLinks={user.profile.socialLinks}
      />
      <UserWorksSection works={works} />
    </PageLayout>
  );
};

export const Route = createFileRoute("/{-$locale}/users/$userId")({
  component: UserRoute,
  loader: async ({ params: { userId } }) => {
    const [user, works] = await Promise.all([
      getUser(userId),
      getUserWorks(userId),
    ]);

    return {
      user,
      works,
    };
  },
});
