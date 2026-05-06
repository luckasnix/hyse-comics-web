import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { ChapterList } from "#/components/chapter-list/component";
import { CreditList } from "#/components/credit-list/component";
import { TabGroup } from "#/components/tab-group/component";
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
  const navigate = useNavigate();

  const { data: credits = [] } = useQuery({
    queryKey: ["comic-credits", comicId],
    queryFn: () => getComicCredits(comicId),
  });

  const navigateToChapter = (chapterId: string) => {
    navigate({
      to: "/chapters/$chapterId",
      params: { chapterId: chapterId },
    });
  };

  const navigateToUser = (userId: string) => {
    navigate({
      to: "/users/$userId",
      params: { userId: userId },
    });
  };

  return (
    <Stack component="section" spacing={2}>
      <TabGroup initialValue={0}>
        <TabGroup.List
          items={[
            { value: 0, label: "Chapters" },
            { value: 1, label: "Credits" },
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
