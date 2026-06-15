import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconHomeFilled } from "@tabler/icons-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useUser } from "#/contexts/user";

const containerStyle: SxProps<Theme> = {
  height: "100dvh",
  justifyContent: "center",
  alignItems: "center",
};

const textContainerStyle: SxProps<Theme> = {
  textAlign: "center",
};

export const NotFoundPage = () => {
  const { t } = useTranslation();

  const { locale } = useParams({ strict: false });

  const { user } = useUser();

  const navigate = useNavigate();

  return (
    <Stack direction="column" spacing={2} sx={containerStyle}>
      <Stack direction="column" spacing={1} sx={textContainerStyle}>
        <Typography variant="h3">{t("errors.pageNotFound")}</Typography>
        <Typography variant="body1">
          {t("errors.pageNotFoundDescription")}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        size="large"
        startIcon={<IconHomeFilled />}
        onClick={() => {
          navigate({
            to: "/{-$locale}",
            params: { locale: locale ?? user.profile.preferredLanguage },
          });
        }}
      >
        {t("errors.backToHome")}
      </Button>
    </Stack>
  );
};
