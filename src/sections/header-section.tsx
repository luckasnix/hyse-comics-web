import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

export const HeaderSection = () => (
  <Box component="header" sx={containerStyle}>
    <img src="/logo.svg" width={384} height={96} alt="Hyse Comics logo" />
  </Box>
);
