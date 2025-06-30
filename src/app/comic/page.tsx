"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { ComicReaderController } from "~/components/comic-reader-controller";
import { comicPanelsMock } from "~/mocks/comics";

const ComicPage = () => {
  const searchParams = useSearchParams();

  const comicId = searchParams.get("id");

  const comicPanels = useMemo(
    () =>
      comicPanelsMock.filter((comicPanel) => comicPanel.comicId === comicId),
    [comicId]
  );

  return (
    <div>
      <h1>Comic Page</h1>
      <p>Comic ID: {comicId}</p>
      <pre>{JSON.stringify(comicPanels, null, 2)}</pre>
      <ComicReaderController
        onPrevButtonClick={() => {}}
        onNextButtonClick={() => {}}
      />
    </div>
  );
};

export default ComicPage;
