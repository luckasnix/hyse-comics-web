import type { Comic, ComicPanel } from "~/types/comics";

export const comicsMock: Array<Comic> = [
  {
    id: "hsGYfEuPQH-U",
    structure: "single-panel",
    orientation: "landscape",
    direction: "western",
    genres: ["action", "adventure", "fantasy", "sci-fi", "supernatural"],
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
    direction: "western",
    genres: ["action", "adventure", "historical", "mystery"],
    title: "Forbidden Treasures",
    summary:
      "In a world where ancient civilizations left secrets buried in forgotten temples, a young archaeologist embarks on risky expeditions in search of relics that could change the fate of humanity.",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/thumbnail.webp",
    imageAltText: "Forbidden Treasures thumbnail",
  },
  {
    id: "HmRdP9Q8iXOH",
    structure: "single-panel",
    orientation: "landscape",
    direction: "western",
    genres: ["action", "sport"],
    title: "Skate Champion",
    summary:
      "From the streets to the world stage, a young skater chases his dream of becoming the greatest of all time. With every trick, every fall, and every victory, his passion burns brighter.",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/thumbnail.webp",
    imageAltText: "Skate Champion thumbnail",
  },
  {
    id: "5G2IKgBnc2ns",
    structure: "single-panel",
    orientation: "landscape",
    direction: "western",
    genres: ["action", "adventure", "historical"],
    title: "Blood and Gold",
    summary:
      "On the high seas, a fearless pirate captain with an iron will, a missing leg, and a single eye chases the ultimate treasure. With his loyal crew by his side, he battles storms, enemies, and fate itself.",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/thumbnail.webp",
    imageAltText: "Blood and Gold thumbnail",
  },
  {
    id: "3tu2mLgN53E-",
    structure: "single-panel",
    orientation: "landscape",
    direction: "western",
    genres: ["adventure", "fantasy"],
    title: "Apprentice of Witchcraft",
    summary:
      "In a grand academy of magic, a young girl begins her journey as an apprentice of witchcraft. Between brewing potions, casting spells, and facing mysterious trials, she must prove her courage and unlock her true power.",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/thumbnail.webp",
    imageAltText: "Apprentice of Witchcraft thumbnail",
  },
  {
    id: "OtRo2Kj4Lym7",
    structure: "single-panel",
    orientation: "landscape",
    direction: "western",
    genres: ["action", "horror", "supernatural", "psychological"],
    title: "The Purifier",
    summary:
      "In a world where demons prey upon human souls, a warrior priest walks the line between faith and fury. Armed with his sacred blade, he battles the darkness within mankind — and within himself.",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/thumbnail.webp",
    imageAltText: "The Purifier thumbnail",
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
  {
    id: "77834591-4e58-44e7-82fc-9fb5115638db",
    comicId: "HmRdP9Q8iXOH",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/panel-1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Skate Champion panel 1",
  },
  {
    id: "19d688a6-de37-476f-a73c-968fba98c389",
    comicId: "HmRdP9Q8iXOH",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/panel-2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Skate Champion panel 2",
  },
  {
    id: "039fe50b-fa05-4c6e-a17e-cdafb6a821bc",
    comicId: "HmRdP9Q8iXOH",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/panel-3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Skate Champion panel 3",
  },
  {
    id: "b0c5d640-cd94-4581-a54d-a7c8663a65ff",
    comicId: "5G2IKgBnc2ns",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/panel-1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Blood and Gold panel 1",
  },
  {
    id: "290bfa89-f20d-450b-8997-987758c85b4f",
    comicId: "5G2IKgBnc2ns",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/panel-2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Blood and Gold panel 2",
  },
  {
    id: "c59adf66-2689-409c-9e6a-0a93963ee06c",
    comicId: "5G2IKgBnc2ns",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/panel-3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Blood and Gold panel 3",
  },
  {
    id: "4a0bc7c5-0d7d-4d46-a187-721173acfc5d",
    comicId: "5G2IKgBnc2ns",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/panel-4.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Blood and Gold panel 4",
  },
  {
    id: "b18c7dd8-a76d-485f-b217-5a23741c1b39",
    comicId: "3tu2mLgN53E-",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/panel-1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Apprentice of Witchcraft panel 1",
  },
  {
    id: "8ef69b6c-dc5a-4c26-bf43-bdd6c56a28f2",
    comicId: "3tu2mLgN53E-",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/panel-2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Apprentice of Witchcraft panel 2",
  },
  {
    id: "2ff8175c-bcd1-43b6-84ed-24b110be9a37",
    comicId: "3tu2mLgN53E-",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/panel-3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "Apprentice of Witchcraft panel 3",
  },
  {
    id: "5586aa59-1fae-4b5f-acb2-346ec0a487a8",
    comicId: "OtRo2Kj4Lym7",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/panel-1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "The Purifier panel 1",
  },
  {
    id: "cc0472f3-fee5-42ce-8f41-fe01e9179062",
    comicId: "OtRo2Kj4Lym7",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/panel-2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "The Purifier panel 2",
  },
  {
    id: "9a21c6dc-0edb-4c1d-ae95-b8c207dd24ab",
    comicId: "OtRo2Kj4Lym7",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/panel-3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "The Purifier panel 3",
  },
  {
    id: "1843a560-6fa2-46de-8c28-9d3b1bfd1362",
    comicId: "OtRo2Kj4Lym7",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/panel-4.webp",
    imageWidth: 1080,
    imageHeight: 720,
    imageAltText: "The Purifier panel 4",
  },
];
