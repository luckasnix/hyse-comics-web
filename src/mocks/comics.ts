import type { Chapter, Comic, Page } from "~/types/comics";

export const comicsMock: Array<Comic> = [
  {
    id: "iXSE",
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
    id: "erZ7",
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
    id: "FSOK",
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
    id: "lfUQ",
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
    id: "tAip",
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
    id: "LAeD",
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
    id: "vNH8ZOb8",
    comicId: "iXSE",
    title: "The Knight's Departure",
    synopsis:
      "Clad in advanced armor, the warrior bids a heartfelt goodbye to the familiar smiles of the village, stepping into an unknown that lies beyond the tranquil community.",
  },
  {
    id: "a6pJNagm",
    comicId: "erZ7",
    title: "The Idol of Aztal'Kha",
    synopsis:
      "Amid the ruins, a hidden idol reveals its golden light, a discovery that may change everything, or unleash what was never meant to be found.",
  },
  {
    id: "XM7ce9ji",
    comicId: "erZ7",
    title: "The Jade Buddha",
    synopsis:
      "Deep within forgotten temples, a fearless archaeologist races against ancient traps to uncover a jade relic of untold power.",
  },
  {
    id: "Uxg6G2c4",
    comicId: "erZ7",
    title: "The Heart of Atlantis",
    synopsis:
      "Deep beneath the ocean, our heroine uncovers a legendary crystal. But her discovery awakens ancient forces guarding its secret.",
  },
  {
    id: "KoEb6BNw",
    comicId: "FSOK",
    title: "Rise Above",
    synopsis:
      "In front of a roaring crowd, one jump decides it all, the moment between falling short and becoming a legend.",
  },
  {
    id: "cFCqsYye",
    comicId: "lfUQ",
    title: "Treasure Island",
    synopsis:
      "The crew lands on hostile shores, their captain leading the charge, where every wave brings the promise of blood and conquest.",
  },
  {
    id: "dKtiDz0q",
    comicId: "tAip",
    title: "The Forest Trial",
    synopsis:
      "Lost in the dark woods, a young witch faces her first true test, where courage must burn brighter than fear.",
  },
  {
    id: "awI4jabe",
    comicId: "tAip",
    title: "The Awakening of the Djinn",
    synopsis:
      "A curious young witch accidentally unleashes a powerful Djinn from an ancient spellbook. Now, she must face the consequences of her mistake.",
  },
  {
    id: "ocxHyVie",
    comicId: "LAeD",
    title: "The Midnight Exorcism",
    synopsis:
      "As the moon rises, faith is tested and fear takes form, only one will survive the night's unholy battle.",
  },
];

export const pagesMock: Array<Page> = [
  {
    id: "79e80cb6-5d66-49c6-a350-f2efd013ae63",
    chapterId: "vNH8ZOb8",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "925eb9c5-fe49-44bb-8c29-2495e0e3eb4f",
    chapterId: "vNH8ZOb8",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "5616800f-ed96-4995-b802-bb0ca3bed992",
    chapterId: "vNH8ZOb8",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "0d656322-0491-4d0a-a3db-f5393b57edc3",
    chapterId: "vNH8ZOb8",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/metaverse-cavalry/ch1-pg4.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "3e3ff617-908f-45cd-aa8d-096d7681de3c",
    chapterId: "a6pJNagm",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "9b6fdfb9-9ff1-4aa3-9a35-39462164e1ac",
    chapterId: "a6pJNagm",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "af693116-e36b-4718-9b1d-276eadf53d56",
    chapterId: "a6pJNagm",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "c9ddd8f0-81be-484b-a15c-02caa73fade9",
    chapterId: "XM7ce9ji",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch2-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "bb6d1478-11fb-498e-b4b7-d32dfe06c425",
    chapterId: "XM7ce9ji",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch2-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "d83bad49-fc9b-41e8-9656-81cecff2132e",
    chapterId: "XM7ce9ji",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch2-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "6fdb0ab6-275a-4ddb-985d-3fedc5fe9272",
    chapterId: "Uxg6G2c4",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch3-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "9478b810-e0c0-4974-a6cc-64d87c628050",
    chapterId: "Uxg6G2c4",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch3-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "adc5c686-4694-4670-b4d3-de8d63d67910",
    chapterId: "Uxg6G2c4",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/forbidden-treasures/ch3-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "77834591-4e58-44e7-82fc-9fb5115638db",
    chapterId: "KoEb6BNw",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "19d688a6-de37-476f-a73c-968fba98c389",
    chapterId: "KoEb6BNw",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "039fe50b-fa05-4c6e-a17e-cdafb6a821bc",
    chapterId: "KoEb6BNw",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/skate-champion/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "b0c5d640-cd94-4581-a54d-a7c8663a65ff",
    chapterId: "cFCqsYye",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "290bfa89-f20d-450b-8997-987758c85b4f",
    chapterId: "cFCqsYye",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "c59adf66-2689-409c-9e6a-0a93963ee06c",
    chapterId: "cFCqsYye",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "4a0bc7c5-0d7d-4d46-a187-721173acfc5d",
    chapterId: "cFCqsYye",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/blood-and-gold/ch1-pg4.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "b18c7dd8-a76d-485f-b217-5a23741c1b39",
    chapterId: "dKtiDz0q",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "8ef69b6c-dc5a-4c26-bf43-bdd6c56a28f2",
    chapterId: "dKtiDz0q",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "2ff8175c-bcd1-43b6-84ed-24b110be9a37",
    chapterId: "dKtiDz0q",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "51a1d969-93b8-472a-a0c9-3add83c5e144",
    chapterId: "awI4jabe",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch2-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "418c62bf-a9df-4cc9-b6b1-78f88cc75833",
    chapterId: "awI4jabe",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch2-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "942c7860-3205-4f21-9ccb-4234e2e9b523",
    chapterId: "awI4jabe",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch2-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "affc4cf6-c14f-433e-9472-28fc4c72e83b",
    chapterId: "awI4jabe",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch2-pg4.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "2790db6f-3bc9-469e-9e57-9e2c63858b29",
    chapterId: "awI4jabe",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/apprentice-of-witchcraft/ch2-pg5.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "5586aa59-1fae-4b5f-acb2-346ec0a487a8",
    chapterId: "ocxHyVie",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/ch1-pg1.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "cc0472f3-fee5-42ce-8f41-fe01e9179062",
    chapterId: "ocxHyVie",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/ch1-pg2.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "9a21c6dc-0edb-4c1d-ae95-b8c207dd24ab",
    chapterId: "ocxHyVie",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/ch1-pg3.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
  {
    id: "1843a560-6fa2-46de-8c28-9d3b1bfd1362",
    chapterId: "ocxHyVie",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/comics/the-purifier/ch1-pg4.webp",
    imageWidth: 1080,
    imageHeight: 720,
  },
];
