import Container, { type ContainerOwnProps } from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

import { FooterSection } from "#/sections/footer-section";
import { HeaderSection } from "#/sections/header-section";

const containerStyle: SxProps<Theme> = {
  paddingY: 4,
};

export type PageLayoutProps = Readonly<{
  children: ReactNode;
  maxWidth?: ContainerOwnProps["maxWidth"];
}>;

export const PageLayout = ({ children, maxWidth = "md" }: PageLayoutProps) => (
  <>
    <HeaderSection />
    <Container maxWidth={maxWidth} sx={containerStyle}>
      {children}
    </Container>
    <FooterSection />
  </>
);
