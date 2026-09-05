import fontsourceVariableNotoSansCss from "@fontsource-variable/noto-sans?url";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { type ReactNode, Suspense } from "react";
import {
  LanguageBoundary,
  LanguageProvider,
  useLanguage,
} from "#/contexts/language.tsx";
import { UiProvider } from "#/contexts/ui.tsx";
import { UserProvider } from "#/contexts/user.tsx";
import { FallbackPage } from "#/pages/fallback-page.tsx";
import { NotFoundPage } from "#/pages/not-found-page.tsx";

const queryClient = new QueryClient();

const Document = ({ children }: { children: ReactNode }) => {
  const { language } = useLanguage();

  return (
    <html lang={language}>
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <UiProvider>
            <LanguageBoundary>
              <Suspense fallback={<FallbackPage />}>{children}</Suspense>
            </LanguageBoundary>
          </UiProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
};

const RootDocument = ({ children }: { children: ReactNode }) => (
  <UserProvider>
    <LanguageProvider>
      <Document>{children}</Document>
    </LanguageProvider>
  </UserProvider>
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
