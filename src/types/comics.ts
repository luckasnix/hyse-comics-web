export type ComicStructure = "single-panel" | "traditional" | "long-scroll";

export type ComicOrientation = "landscape" | "portrait";

export type ComicGenre =
  | "action"
  | "adventure"
  | "comedy"
  | "crime"
  | "drama"
  | "fantasy"
  | "horror"
  | "mystery"
  | "romance"
  | "sci-fi";

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
