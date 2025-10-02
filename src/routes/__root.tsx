import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import fontsourceVariableNotoSansCss from "@fontsource-variable/noto-sans?url";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { type ReactNode, Suspense } from "react";

import { FallbackPage } from "~/pages/fallback";
import { NotFound } from "~/pages/not-found";
import { theme } from "~/styles/theme";

const emotionCache = createCache({ key: "css" });

const Providers = ({ children }: { children: ReactNode }) => (
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </CacheProvider>
);

const RootDocument = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      <HeadContent />
    </head>
    <body>
      <Providers>
        <Suspense fallback={<FallbackPage />}>{children}</Suspense>
      </Providers>
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
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});
