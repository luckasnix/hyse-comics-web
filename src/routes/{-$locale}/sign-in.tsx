import { createFileRoute } from "@tanstack/react-router";

import { SignInForm } from "#/components/sign-in-form.tsx";
import { PageLayout } from "#/layouts/page-layout.tsx";

const SignInRoute = () => (
  <PageLayout maxWidth="sm">
    <SignInForm />
  </PageLayout>
);

export const Route = createFileRoute("/{-$locale}/sign-in")({
  component: SignInRoute,
});
