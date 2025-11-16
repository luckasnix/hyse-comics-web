import Container from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

import { FooterSection } from "~/sections/footer-section";
import { HeaderSection } from "~/sections/header-section";

const containerStyle: SxProps<Theme> = {
  paddingY: 4,
};

export type PageLayoutProps = Readonly<{
  children: ReactNode;
}>;

export const PageLayout = ({ children }: PageLayoutProps) => (
  <>
    <HeaderSection />
    <Container maxWidth="md" sx={containerStyle}>
      {children}
    </Container>
    <FooterSection />
  </>
);
