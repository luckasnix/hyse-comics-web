import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "primary.main",
  padding: 2,
  gap: 1,
};

const iconButtonStyle: SxProps<Theme> = {
  color: "primary.contrastText",
};

const logoStyle: CSSProperties = {
  filter: "brightness(0) invert(1)",
};

export const FooterSection = () => (
  <Box component="footer" sx={containerStyle}>
    <img
      src="/logo.svg"
      width={256}
      height={64}
      style={logoStyle}
      alt="Hyse Comics logo"
    />
    <Stack direction="row" spacing={1}>
      <IconButton
        component="a"
        href="https://x.com/luckasnix"
        target="_blank"
        rel="noopener noreferrer"
        sx={iconButtonStyle}
      >
        <XIcon />
      </IconButton>
      <IconButton
        component="a"
        href="https://www.instagram.com/luc.kasnix/"
        target="_blank"
        rel="noopener noreferrer"
        sx={iconButtonStyle}
      >
        <InstagramIcon />
      </IconButton>
    </Stack>
  </Box>
);
