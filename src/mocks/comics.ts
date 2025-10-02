import metaverseCavalryPanel1 from "~/storage/metaverse-cavalry-panel-1.webp?url";
import metaverseCavalryPanel2 from "~/storage/metaverse-cavalry-panel-2.webp?url";
import metaverseCavalryPanel3 from "~/storage/metaverse-cavalry-panel-3.webp?url";
import metaverseCavalryThumbnail from "~/storage/metaverse-cavalry-thumbnail.webp?url";
import type { Comic, ComicPanel } from "~/types/comics";

export const comicsMock: Array<Comic> = [
  {
    id: "hsGYfEuPQH-U",
    structure: "single-panel",
    orientation: "landscape",
    genres: ["action", "adventure", "fantasy", "sci-fi"],
    title: "Metaverse Cavalry",
    summary:
      "In a vast medieval world set within the Metaverse, a young warrior is summoned to face a looming threat that corrupts the very fabric of this digital reality: a powerful demon bent on destruction.",
    imageUrl: metaverseCavalryThumbnail,
    imageAltText: "Metaverse Cavalry thumbnail",
  },
];

export const comicPanelsMock: Array<ComicPanel> = [
  {
    id: "79e80cb6-5d66-49c6-a350-f2efd013ae63",
    comicId: "hsGYfEuPQH-U",
    imageUrl: metaverseCavalryPanel1,
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Metaverse Cavalry panel 1",
  },
  {
    id: "925eb9c5-fe49-44bb-8c29-2495e0e3eb4f",
    comicId: "hsGYfEuPQH-U",
    imageUrl: metaverseCavalryPanel2,
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Metaverse Cavalry panel 2",
  },
  {
    id: "5616800f-ed96-4995-b802-bb0ca3bed992",
    comicId: "hsGYfEuPQH-U",
    imageUrl: metaverseCavalryPanel3,
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Metaverse Cavalry panel 3",
  },
];
