import { createFileRoute } from "@tanstack/react-router";

import { ComicReaderSection } from "~/sections/comic-reader-section";

const ComicsRoute = () => <ComicReaderSection />;

export const Route = createFileRoute("/comics/$comicId")({
  component: ComicsRoute,
});
