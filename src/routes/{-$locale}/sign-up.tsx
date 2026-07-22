import { createFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "#/components/sign-up-form";
import { PageLayout } from "#/layouts/page-layout";

const SignUpRoute = () => (
  <PageLayout maxWidth="sm">
    <SignUpForm />
  </PageLayout>
);

export const Route = createFileRoute("/{-$locale}/sign-up")({
  component: SignUpRoute,
});
