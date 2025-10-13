export type ComicStructure = "single-panel" | "traditional" | "long-scroll";

export type ComicOrientation = "landscape" | "portrait";

export type ComicGenre =
  | "action"
  | "adventure"
  | "biography"
  | "comedy"
  | "crime"
  | "drama"
  | "educational"
  | "fantasy"
  | "historical"
  | "horror"
  | "mystery"
  | "post-apocalyptic"
  | "psychological"
  | "romance"
  | "satire"
  | "sci-fi"
  | "slice-of-life"
  | "sport"
  | "superhero"
  | "supernatural"
  | "thriller"
  | "war"
  | "western";

export type Comic = {
  id: string;
  structure: ComicStructure;
  orientation: ComicOrientation;
  genres: Array<ComicGenre>;
  title: string;
  summary: string;
  imageUrl: string;
  imageAltText: string;
};

export type ComicPanel = {
  id: string;
  comicId: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  imageAltText: string;
};
