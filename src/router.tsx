import { createRouter } from "@tanstack/react-router";

import { DefaultError } from "#/components/default-error.tsx";
import { SplashPage } from "#/pages/splash-page.tsx";

import { routeTree } from "./routeTree.gen.ts";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultError,
    defaultPendingComponent: SplashPage,
    defaultPendingMs: 0,
    defaultPendingMinMs: 0,
  });
