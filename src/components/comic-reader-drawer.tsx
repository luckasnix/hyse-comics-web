import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ChapterList } from "#/components/chapter-list";
import { CreditList } from "#/components/credit-list";
import { ListState } from "#/components/list-state";
import { TabGroup } from "#/components/tab-group";
import { useComic } from "#/contexts/comic";
import { getChapterCredits } from "#/services/comics";
import { getClampedTextStyle, linkResetStyle } from "#/styles/common";

export type ComicReaderDrawerProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

const containerStyle: SxProps<Theme> = {
  width: {
    xs: "100vw",
    sm: 420,
  },
  maxWidth: "100vw",
  paddingTop: 1,
};

const headerActionsStyle: SxProps<Theme> = {
  paddingX: 3,
  display: "flex",
  justifyContent: "end",
};

const overviewStyle: SxProps<Theme> = {
  paddingX: 3,
};

const synopsisStyle: SxProps<Theme> = {
  color: "text.secondary",
  ...getClampedTextStyle(4),
};

export const ComicReaderDrawer = ({
  isOpen,
  onClose,
}: ComicReaderDrawerProps) => {
  const { comic, chapters, currentChapterId } = useComic();

  const { t } = useTranslation();

  const { locale } = useParams({ strict: false });

  const navigate = useNavigate();

  const {
    data: chapterCredits = [],
    isPending: areChapterCreditsPending,
    isError: didChapterCreditsError,
  } = useQuery({
    queryKey: ["chapter-credits", currentChapterId],
    queryFn: () => getChapterCredits(currentChapterId ?? ""),
    enabled: isOpen && !!currentChapterId,
  });

  const navigateToChapter = (chapterId: string) => {
    navigate({
      to: "/{-$locale}/chapters/$chapterId",
      params: { locale, chapterId: chapterId },
    });
  };

  const navigateToUser = (userId: string) => {
    navigate({
      to: "/{-$locale}/users/$userId",
      params: { locale, userId: userId },
    });
  };

  const renderCredits = () => {
    if (!currentChapterId) {
      return <CreditList credits={[]} onCreditClick={navigateToUser} />;
    }

    if (areChapterCreditsPending) {
      return <ListState kind="pending" message={t("reader.loadingCredits")} />;
    }

    if (didChapterCreditsError) {
      return <ListState kind="error" message={t("reader.creditsLoadError")} />;
    }

    return (
      <CreditList credits={chapterCredits} onCreditClick={navigateToUser} />
    );
  };

  return (
    <Drawer open={isOpen} anchor="right" onClose={onClose}>
      <Stack spacing={1} sx={containerStyle}>
        <Box sx={headerActionsStyle}>
          <IconButton aria-label={t("reader.close")} onClick={onClose}>
            <IconX />
          </IconButton>
        </Box>
        <Link
          to="/{-$locale}/comics/$comicId"
          params={{ locale, comicId: comic.id }}
          style={linkResetStyle}
        >
          <Box sx={overviewStyle}>
            <Typography variant="h4" gutterBottom sx={getClampedTextStyle(2)}>
              {comic.title}
            </Typography>
            <Typography variant="body1" sx={synopsisStyle}>
              {comic.synopsis}
            </Typography>
          </Box>
        </Link>
        <TabGroup initialValue={0}>
          <TabGroup.List
            items={[
              { value: 0, label: t("reader.chapters") },
              { value: 1, label: t("reader.credits") },
            ]}
          />
          <TabGroup.Panel value={0}>
            <ChapterList
              chapters={chapters}
              selectedChapterId={currentChapterId}
              onChapterClick={navigateToChapter}
            />
          </TabGroup.Panel>
          <TabGroup.Panel value={1}>{renderCredits()}</TabGroup.Panel>
        </TabGroup>
      </Stack>
    </Drawer>
  );
};
