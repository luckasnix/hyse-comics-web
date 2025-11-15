import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";
import { ComicChapterList } from "~/components/comic-chapter-list";
import { ComicOverview } from "~/components/comic-overview";

import { getChapters, getComic } from "~/services/comics";

const containerStyle: SxProps<Theme> = {
  paddingY: 4,
};

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
    <Container maxWidth="md" sx={containerStyle}>
      <ComicOverview comic={comic} />
      <Stack spacing={2}>
        <Typography variant="h4">Chapters</Typography>
        <ComicChapterList
          chapters={chapters}
          selectedChapterId={null}
          onChapterClick={navigateToChapter}
        />
      </Stack>
    </Container>
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
