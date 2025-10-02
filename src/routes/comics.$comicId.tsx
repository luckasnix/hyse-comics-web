import { createFileRoute } from "@tanstack/react-router";

import { ComicReaderSection } from "~/sections/comic-reader-section";

const ComicsPage = () => <ComicReaderSection />;

export const Route = createFileRoute("/comics/$comicId")({
  component: ComicsPage,
});
