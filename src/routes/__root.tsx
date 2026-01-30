import fontsourceVariableNotoSansCss from "@fontsource-variable/noto-sans?url";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { type ReactNode, Suspense } from "react";

import { UiProvider } from "#/contexts/ui-context";
import { UserProvider } from "#/contexts/user-context";
import { usersMock } from "#/mocks/users";
import { FallbackPage } from "#/pages/fallback-page";
import { NotFoundPage } from "#/pages/not-found-page";

const queryClient = new QueryClient();

const RootDocument = ({ children }: { children: ReactNode }) => (
  // TODO: Add internationalization with American English and Brazilian Portuguese
  <html lang="en-US">
    <head>
      <HeadContent />
    </head>
    <body>
      <QueryClientProvider client={queryClient}>
        <UiProvider>
          <UserProvider user={usersMock[0]}>
            <Suspense fallback={<FallbackPage />}>{children}</Suspense>
          </UserProvider>
        </UiProvider>
      </QueryClientProvider>
      <Scripts />
    </body>
  </html>
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "description",
        content: "Read your favorite comics",
      },
      {
        title: "Hyse Comics",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: fontsourceVariableNotoSansCss,
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
    ],
  }),
  notFoundComponent: NotFoundPage,
  shellComponent: RootDocument,
});
