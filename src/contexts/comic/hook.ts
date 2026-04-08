import { useContext } from "react";

import { ComicContext } from "./context";

export const useComic = () => {
  const context = useContext(ComicContext);

  if (!context) {
    throw new Error("The hook 'useComic' must be used inside 'ComicProvider'.");
  }

  return context;
};
