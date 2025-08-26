"use client";
import { createTheme } from "@mui/material/styles";

import { notoSans } from "~/styles/fonts";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#00796b",
      light: "#339388",
      dark: "#00544a",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: [notoSans.style.fontFamily, "sans-serif"].join(","),
  },
});
