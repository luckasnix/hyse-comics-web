import { createRouter } from "@tanstack/react-router";

import { DefaultError } from "#/components/default-error.tsx";

import { routeTree } from "./routeTree.gen.ts";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultError,
  });
