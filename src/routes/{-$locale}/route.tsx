import { createFileRoute, Outlet } from "@tanstack/react-router";

import { NotFoundPage } from "#/pages/not-found-page.tsx";

export const Route = createFileRoute("/{-$locale}")({
  component: Outlet,
  notFoundComponent: NotFoundPage,
});
