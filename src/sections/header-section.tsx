import GitHubIcon from "@mui/icons-material/GitHub";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

const toolbarStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
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
      <Box>
        <IconButton
          component="a"
          href="https://github.com/luckasnix/hyse-comics-web"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
);
