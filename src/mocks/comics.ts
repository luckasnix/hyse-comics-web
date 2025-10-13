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
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/thumbnail.webp",
    imageAltText: "Metaverse Cavalry thumbnail",
  },
  {
    id: "eAvdmZnEgri3",
    structure: "single-panel",
    orientation: "landscape",
    genres: ["action", "adventure", "mystery"],
    title: "Forbidden Treasures",
    summary:
      "In a world where ancient civilizations left secrets buried in forgotten temples, a young archaeologist embarks on risky expeditions in search of relics that could change the fate of humanity.",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/thumbnail.webp",
    imageAltText: "Forbidden Treasures thumbnail",
  },
];

export const comicPanelsMock: Array<ComicPanel> = [
  {
    id: "79e80cb6-5d66-49c6-a350-f2efd013ae63",
    comicId: "hsGYfEuPQH-U",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/panel-1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Metaverse Cavalry panel 1",
  },
  {
    id: "925eb9c5-fe49-44bb-8c29-2495e0e3eb4f",
    comicId: "hsGYfEuPQH-U",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/panel-2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Metaverse Cavalry panel 2",
  },
  {
    id: "5616800f-ed96-4995-b802-bb0ca3bed992",
    comicId: "hsGYfEuPQH-U",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/panel-3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Metaverse Cavalry panel 3",
  },
  {
    id: "0d656322-0491-4d0a-a3db-f5393b57edc3",
    comicId: "hsGYfEuPQH-U",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/panel-4.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Metaverse Cavalry panel 4",
  },
  {
    id: "3e3ff617-908f-45cd-aa8d-096d7681de3c",
    comicId: "eAvdmZnEgri3",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/panel-1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Forbidden Treasures panel 1",
  },
  {
    id: "9b6fdfb9-9ff1-4aa3-9a35-39462164e1ac",
    comicId: "eAvdmZnEgri3",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/panel-2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Forbidden Treasures panel 2",
  },
  {
    id: "af693116-e36b-4718-9b1d-276eadf53d56",
    comicId: "eAvdmZnEgri3",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/panel-3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Forbidden Treasures panel 3",
  },
];
