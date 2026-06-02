import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

export const HeaderSection = () => {
  const { t } = useTranslation();

  return (
    <Box component="header" sx={containerStyle}>
      <img src="/logo.svg" width={384} height={96} alt={t("brand.logoAlt")} />
    </Box>
  );
};
