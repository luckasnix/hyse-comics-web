import { createFileRoute } from "@tanstack/react-router";

import { SettingsForm } from "#/components/settings-form";
import { PageLayout } from "#/layouts/page-layout";

const SettingsRoute = () => (
  <PageLayout maxWidth="sm">
    <SettingsForm />
  </PageLayout>
);

export const Route = createFileRoute("/{-$locale}/settings")({
  component: SettingsRoute,
});
