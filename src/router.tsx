import { createRouter } from "@tanstack/react-router";

import { DefaultError } from "./components/default-error";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: ({ error }) => <DefaultError error={error} />,
  });
