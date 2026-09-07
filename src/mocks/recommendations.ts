import type { Comic, Recommendation } from "#/types/comics.ts";

import { comicsMock } from "./comics.ts";

const getComics = (comicIds: Array<string>): Array<Comic> =>
  comicIds
    .map((comicId) => comicsMock.find((comic) => comic.id === comicId))
    .filter((comic) => comic !== undefined);

export const recommendationsMock: Array<Recommendation> = [
  {
    id: "trending-now",
    title: "Trending now",
    comics: getComics([
      "QhbGUrW2",
      "LPLc5tsY",
      "iEdqrCrJ",
      "t7uzBpFU",
      "9eaVmAst",
      "4ShLAvTY",
    ]),
  },
  {
    id: "continue-reading",
    title: "Continue reading",
    comics: getComics([
      "QhbGUrW2",
      "LPLc5tsY",
      "iEdqrCrJ",
      "t7uzBpFU",
      "9eaVmAst",
      "4ShLAvTY",
    ]),
  },
];
