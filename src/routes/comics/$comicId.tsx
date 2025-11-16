import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { ComicChapterList } from "~/components/comic-chapter-list";
import { ComicOverview } from "~/components/comic-overview";

import { PageLayout } from "~/layouts/page-layout";
import { getChapters, getComic } from "~/services/comics";

const ComicRoute = () => {
  const { comic, chapters } = Route.useLoaderData();

  const navigate = Route.useNavigate();

  const navigateToChapter = (chapterId: string) => {
    navigate({
      to: "/chapters/$chapterId",
      params: { chapterId: chapterId },
    });
  };

  return (
    <PageLayout>
      <ComicOverview comic={comic} />
      <Stack spacing={2}>
        <Typography variant="h4">Chapters</Typography>
        <ComicChapterList
          chapters={chapters}
          selectedChapterId={null}
          onChapterClick={navigateToChapter}
        />
      </Stack>
    </PageLayout>
  );
};

export const Route = createFileRoute("/comics/$comicId")({
  component: ComicRoute,
  loader: async ({ params: { comicId } }) => {
    const [comic, chapters] = await Promise.all([
      getComic(comicId),
      getChapters(comicId),
    ]);

    return {
      comic,
      chapters,
    };
  },
});
