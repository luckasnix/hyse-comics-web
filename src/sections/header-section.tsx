import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { linkResetStyle } from "#/styles/common";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

export const HeaderSection = () => {
  const { t } = useTranslation();

  const { locale } = useParams({ strict: false });

  return (
    <Box component="header" sx={containerStyle}>
      <Link to="/{-$locale}" params={{ locale }} style={linkResetStyle}>
        <img src="/logo.svg" width={384} height={96} alt={t("brand.logoAlt")} />
      </Link>
    </Box>
  );
};
