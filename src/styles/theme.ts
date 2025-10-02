import { createTheme } from "@mui/material/styles";

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
    fontFamily: "'Noto Sans Variable', sans-serif",
  },
});
