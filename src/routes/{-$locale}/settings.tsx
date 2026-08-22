import { createFileRoute } from "@tanstack/react-router";

import { SettingsForm } from "#/components/settings-form.tsx";
import { PageLayout } from "#/layouts/page-layout.tsx";

const SettingsRoute = () => (
  <PageLayout maxWidth="sm">
    <SettingsForm />
  </PageLayout>
);

export const Route = createFileRoute("/{-$locale}/settings")({
  component: SettingsRoute,
});
