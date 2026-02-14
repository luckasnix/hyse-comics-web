import type { Chapter, Comic, Credit, Page } from "#/types/comics";

export const comicsMock: Array<Comic> = [
  {
    id: "QhbGUrW2",
    structure: "single-panel",
    orientation: "landscape",
    direction: "eastern",
    genres: ["action", "adventure", "fantasy", "sci-fi", "supernatural"],
    title: "Metaverse Cavalry",
    synopsis:
      "In a vast medieval world set within the Metaverse, a young warrior is summoned to face a looming threat that corrupts the very fabric of this digital reality: a powerful demon bent on destruction.",
    thumbnailUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/th.webp",
    coverUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/cv.webp",
  },
  {
    id: "LPLc5tsY",
    structure: "single-panel",
    orientation: "landscape",
    direction: "western",
    genres: ["action", "adventure", "historical", "mystery"],
    title: "Forbidden Treasures",
    synopsis:
      "In a world where ancient civilizations left secrets buried in forgotten temples, a young archaeologist embarks on risky expeditions in search of relics that could change the fate of humanity.",
    thumbnailUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/th.webp",
    coverUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/cv.webp",
  },
  {
    id: "iEdqrCrJ",
    structure: "single-panel",
    orientation: "landscape",
    direction: "western",
    genres: ["action", "sport"],
    title: "Skate Champion",
    synopsis:
      "From the streets to the world stage, a young skater chases his dream of becoming the greatest of all time. With every trick, every fall, and every victory, his passion burns brighter.",
    thumbnailUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/th.webp",
    coverUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/cv.webp",
  },
  {
    id: "t7uzBpFU",
    structure: "single-panel",
    orientation: "landscape",
    direction: "eastern",
    genres: ["action", "adventure", "historical"],
    title: "Blood and Gold",
    synopsis:
      "On the high seas, a fearless pirate captain with an iron will, a missing leg, and a single eye chases the ultimate treasure. With his loyal crew by his side, he battles storms, enemies, and fate itself.",
    thumbnailUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/th.webp",
    coverUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/cv.webp",
  },
  {
    id: "9eaVmAst",
    structure: "single-panel",
    orientation: "landscape",
    direction: "western",
    genres: ["adventure", "fantasy"],
    title: "Apprentice of Witchcraft",
    synopsis:
      "In a grand academy of magic, a young girl begins her journey as an apprentice of witchcraft. Between brewing potions, casting spells, and facing mysterious trials, she must prove her courage and unlock her true power.",
    thumbnailUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/th.webp",
    coverUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/cv.webp",
  },
  {
    id: "4ShLAvTY",
    structure: "single-panel",
    orientation: "landscape",
    direction: "western",
    genres: ["action", "horror", "supernatural", "psychological"],
    title: "The Purifier",
    synopsis:
      "In a world where demons prey upon human souls, a warrior priest walks the line between faith and fury. Armed with his sacred blade, he battles the darkness within mankind — and within himself.",
    thumbnailUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/th.webp",
    coverUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/cv.webp",
  },
];

export const chaptersMock: Array<Chapter> = [
  {
    id: "3URztCal8w",
    comicId: "QhbGUrW2",
    title: "The Knight's Departure",
    synopsis:
      "Clad in advanced armor, the warrior bids a heartfelt goodbye to the familiar smiles of the village, stepping into an unknown that lies beyond the tranquil community.",
  },
  {
    id: "77Pbvn95Tz",
    comicId: "LPLc5tsY",
    title: "The Idol of Aztal'Kha",
    synopsis:
      "Amid the ruins, a hidden idol reveals its golden light, a discovery that may change everything, or unleash what was never meant to be found.",
  },
  {
    id: "cIPaxxhdRk",
    comicId: "LPLc5tsY",
    title: "The Jade Buddha",
    synopsis:
      "Deep within forgotten temples, a fearless archaeologist races against ancient traps to uncover a jade relic of untold power.",
  },
  {
    id: "8n86aCriNv",
    comicId: "LPLc5tsY",
    title: "The Heart of Atlantis",
    synopsis:
      "Deep beneath the ocean, our heroine uncovers a legendary crystal. But her discovery awakens ancient forces guarding its secret.",
  },
  {
    id: "mduaZ9Iu3k",
    comicId: "iEdqrCrJ",
    title: "Rise Above",
    synopsis:
      "In front of a roaring crowd, one jump decides it all, the moment between falling short and becoming a legend.",
  },
  {
    id: "h4Ot0UrDfB",
    comicId: "t7uzBpFU",
    title: "Treasure Island",
    synopsis:
      "The crew lands on hostile shores, their captain leading the charge, where every wave brings the promise of blood and conquest.",
  },
  {
    id: "B7e2KQ40pw",
    comicId: "9eaVmAst",
    title: "The Forest Trial",
    synopsis:
      "Lost in the dark woods, a young witch faces her first true test, where courage must burn brighter than fear.",
  },
  {
    id: "ppgL2CuVHR",
    comicId: "9eaVmAst",
    title: "The Awakening of the Djinn",
    synopsis:
      "A curious young witch accidentally unleashes a powerful Djinn from an ancient spellbook. Now, she must face the consequences of her mistake.",
  },
  {
    id: "LlAkuYOs5J",
    comicId: "4ShLAvTY",
    title: "The Midnight Exorcism",
    synopsis:
      "As the moon rises, faith is tested and fear takes form, only one will survive the night's unholy battle.",
  },
];

export const pagesMock: Array<Page> = [
  {
    id: "hL12iPBkjxL1",
    chapterId: "3URztCal8w",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: null,
  },
  {
    id: "DudTXoHOKAYO",
    chapterId: "3URztCal8w",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: null,
  },
  {
    id: "yzSRqK2NZKwW",
    chapterId: "3URztCal8w",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: null,
  },
  {
    id: "zNzTHIRtvxP2",
    chapterId: "3URztCal8w",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/ch1-pg4.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: null,
  },
  {
    id: "F4dhc2moeLqL",
    chapterId: "77Pbvn95Tz",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "C4llozTOUTq6",
    chapterId: "77Pbvn95Tz",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "g6Xibl9M3eCF",
    chapterId: "77Pbvn95Tz",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "9qCb7Grf0Z3C",
    chapterId: "cIPaxxhdRk",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch2-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "WtUltVQkXfGD",
    chapterId: "cIPaxxhdRk",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch2-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "JXYWpZLLSsX8",
    chapterId: "cIPaxxhdRk",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch2-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "HRGi1AmGMqIQ",
    chapterId: "8n86aCriNv",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch3-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "Z1q1ZsMl09zz",
    chapterId: "8n86aCriNv",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch3-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "V1UjEhS4zcfM",
    chapterId: "8n86aCriNv",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch3-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "zXXAJX34uh5f",
    chapterId: "mduaZ9Iu3k",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "4IsYMn6qYoVd",
    chapterId: "mduaZ9Iu3k",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "SATeaYapvzwf",
    chapterId: "mduaZ9Iu3k",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "MdBg2Xscgq6Q",
    chapterId: "h4Ot0UrDfB",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "parchment",
  },
  {
    id: "VBbOwxUVGWyY",
    chapterId: "h4Ot0UrDfB",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "parchment",
  },
  {
    id: "XinVfOSOlwAA",
    chapterId: "h4Ot0UrDfB",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "parchment",
  },
  {
    id: "LzlhPril6R3S",
    chapterId: "h4Ot0UrDfB",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/ch1-pg4.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "parchment",
  },
  {
    id: "XTX0kqHXv3XG",
    chapterId: "B7e2KQ40pw",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "YdJZNZPhtiUX",
    chapterId: "B7e2KQ40pw",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "z1lTnhEqxxZG",
    chapterId: "B7e2KQ40pw",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "j9zFHiavtswx",
    chapterId: "ppgL2CuVHR",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch2-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "50Dbe0UEG9iy",
    chapterId: "ppgL2CuVHR",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch2-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "OFgYzDtf58Vk",
    chapterId: "ppgL2CuVHR",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch2-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "Ks90KKvPVXKv",
    chapterId: "ppgL2CuVHR",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch2-pg4.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "LnR7SZyywXaP",
    chapterId: "ppgL2CuVHR",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch2-pg5.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "white-paper",
  },
  {
    id: "iLp24SwA5fBD",
    chapterId: "LlAkuYOs5J",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "black-paper",
  },
  {
    id: "BYR877ZlOsZE",
    chapterId: "LlAkuYOs5J",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "black-paper",
  },
  {
    id: "98SWWdBWqRmc",
    chapterId: "LlAkuYOs5J",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "black-paper",
  },
  {
    id: "euF02qcm8ZYU",
    chapterId: "LlAkuYOs5J",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/ch1-pg4.webp",
    imageWidth: 1080,
    imageHeight: 720,
    backgroundTexture: "black-paper",
  },
];

export const creditsMock: Array<Credit> = [
  {
    chapterId: "3URztCal8w",
    userId: "xhMmYL0qjhVK",
    role: "comics:writer",
  },
  {
    chapterId: "mduaZ9Iu3k",
    userId: "xhMmYL0qjhVK",
    role: "comics:letterer",
  },
  {
    chapterId: "LlAkuYOs5J",
    userId: "xhMmYL0qjhVK",
    role: "comics:editor",
  },
];
