import { createFileRoute } from "@tanstack/react-router";

import { PageLayout } from "#/layouts/page-layout";
import { ComicNavigationSection } from "#/sections/comic-navigation-section.tsx";
import { ComicOverviewSection } from "#/sections/comic-overview-section";
import { getChapters, getComic } from "#/services/comics";

const ComicRoute = () => {
  const { comic, chapters } = Route.useLoaderData();

  return (
    <PageLayout>
      <ComicOverviewSection comic={comic} />
      <ComicNavigationSection comicId={comic.id} chapters={chapters} />
    </PageLayout>
  );
};

export const Route = createFileRoute("/{-$locale}/comics/$comicId")({
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
