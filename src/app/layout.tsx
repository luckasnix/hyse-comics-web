import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { type ReactNode, Suspense } from "react";

import { notoSans } from "~/styles/fonts";
import { theme } from "~/styles/theme";

import { FallbackPage } from "./fallback";

export const metadata: Metadata = {
  title: "Hyse Comics",
  description: "Read your favorite comics",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en">
    <body className={notoSans.variable}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<FallbackPage />}>{children}</Suspense>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default RootLayout;
