import type { Advertisement } from "#/types/advertisements.ts";

export const advertisementsMock: Array<Advertisement> = [
  {
    id: "the-gospel-of-the-presence",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/advertisements/home/ad-1.webp",
    cta: {
      url: "https://evangelhodapresenca.com",
      label: "Saiba mais",
      position: "bottom-left",
      tone: "light",
    },
  },
  {
    id: "active-listening",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/advertisements/home/ad-2.webp",
    cta: {
      url: "https://escutaativa.métodoada.com",
      label: "Saiba mais",
      position: "bottom-left",
      tone: "light",
    },
  },
];
