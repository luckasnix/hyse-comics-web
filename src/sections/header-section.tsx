import AppBar from "@mui/material/AppBar";
import type { SxProps, Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

const toolbarStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "start",
};

const logoLinkStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
};

export const HeaderSection = () => (
  <AppBar position="static" color="transparent" elevation={1}>
    <Toolbar sx={toolbarStyle}>
      <Link to="/" style={logoLinkStyle}>
        <img src="/logo.svg" width={256} height={64} alt="Hyse Comics logo" />
      </Link>
    </Toolbar>
  </AppBar>
);
