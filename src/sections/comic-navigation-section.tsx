import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ChapterList } from "#/components/chapter-list";
import { CreditList } from "#/components/credit-list";
import { TabGroup } from "#/components/tab-group";
import { getComicCredits } from "#/services/comics";
import type { Chapter } from "#/types/comics";

export type ComicNavigationSectionProps = Readonly<{
  comicId: string;
  chapters: Array<Chapter>;
}>;

export const ComicNavigationSection = ({
  comicId,
  chapters,
}: ComicNavigationSectionProps) => {
  const { t } = useTranslation();

  const { locale } = useParams({ strict: false });

  const navigate = useNavigate();

  const { data: credits = [] } = useQuery({
    queryKey: ["comic-credits", comicId],
    queryFn: () => getComicCredits(comicId),
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

  return (
    <Stack component="section" spacing={2}>
      <TabGroup initialValue={0}>
        <TabGroup.List
          items={[
            { value: 0, label: t("navigation.chapters") },
            { value: 1, label: t("navigation.credits") },
          ]}
        />
        <TabGroup.Panel value={0}>
          <ChapterList
            chapters={chapters}
            selectedChapterId={null}
            onChapterClick={navigateToChapter}
          />
        </TabGroup.Panel>
        <TabGroup.Panel value={1}>
          <CreditList credits={credits} onCreditClick={navigateToUser} />
        </TabGroup.Panel>
      </TabGroup>
    </Stack>
  );
};
