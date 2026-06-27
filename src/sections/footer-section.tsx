import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import {
  IconBrandInstagram,
  IconBrandThreads,
  IconBrandX,
} from "@tabler/icons-react";
import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

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
  borderRadius: 1,
};

const logoStyle: CSSProperties = {
  filter: "brightness(0) invert(1)",
};

// TODO: Use Hyse's social media
export const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <Box component="footer" sx={containerStyle}>
      <img
        src="/logo.svg"
        width={256}
        height={64}
        style={logoStyle}
        alt={t("brand.logoAlt")}
      />
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="Hyse on X"
          component="a"
          href="https://x.com/luckasnix"
          target="_blank"
          rel="noopener noreferrer"
          sx={iconButtonStyle}
        >
          <IconBrandX />
        </IconButton>
        <IconButton
          aria-label="Hyse on Instagram"
          component="a"
          href="https://www.instagram.com/luckasnix"
          target="_blank"
          rel="noopener noreferrer"
          sx={iconButtonStyle}
        >
          <IconBrandInstagram />
        </IconButton>
        <IconButton
          aria-label="Hyse on Threads"
          component="a"
          href="https://www.threads.com/@luckasnix"
          target="_blank"
          rel="noopener noreferrer"
          sx={iconButtonStyle}
        >
          <IconBrandThreads />
        </IconButton>
      </Stack>
    </Box>
  );
};
