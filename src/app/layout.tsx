import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { type ReactNode, Suspense } from "react";

import { theme } from "~/styles/theme";

import { FallbackPage } from "./fallback";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

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
		<body className={roboto.variable}>
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
