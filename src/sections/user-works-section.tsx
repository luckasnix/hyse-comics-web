import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { UserWorkList } from "#/components/user-work-list";
import type { UserComicWork } from "#/types/comics";

export type UserWorksSectionProps = Readonly<{
  works: Array<UserComicWork>;
}>;

const containerStyle: SxProps<Theme> = {
  width: "100%",
};

export const UserWorksSection = ({ works }: UserWorksSectionProps) => {
  const { t } = useTranslation();

  const { locale } = useParams({ strict: false });

  const navigate = useNavigate();

  const navigateToComic = (comicId: string) => {
    navigate({
      to: "/{-$locale}/comics/$comicId",
      params: { locale, comicId },
    });
  };

  return (
    <Stack component="section" spacing={2} sx={containerStyle}>
      <Typography variant="h4">{t("users.works")}</Typography>
      <UserWorkList works={works} onWorkClick={navigateToComic} />
    </Stack>
  );
};
