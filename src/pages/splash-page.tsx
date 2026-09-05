import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { keyframes, type SxProps, type Theme } from "@mui/material/styles";

const logoScale = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
`;

const containerStyle: SxProps<Theme> = {
  minHeight: "100dvh",
  justifyContent: "center",
  alignItems: "center",
};

const logoStyle: SxProps<Theme> = {
  display: "block",
  animation: `${logoScale} 2s ease-in-out infinite`,
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
  },
};

export const SplashPage = () => (
  <Grid container sx={containerStyle}>
    <Box
      component="img"
      src="/logomark.svg"
      alt="Hyse Comics logomark"
      width={120}
      height={120}
      sx={logoStyle}
    />
  </Grid>
);
