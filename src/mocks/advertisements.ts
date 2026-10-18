import type { Advertisement } from "#/types/advertisements.ts";

export const advertisementsMock: Array<Advertisement> = [
  {
    id: "the-gospel-of-the-presence",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/advertisements/home/ad-1.webp",
    targetUrl: "https://evangelhodapresenca.com",
    ctaPosition: "bottom-left",
    ctaTone: "light",
  },
  {
    id: "active-listening",
    imageUrl:
      "https://ncruxkkvlxobsrzmvbkz.supabase.co/storage/v1/object/public/advertisements/home/ad-2.webp",
    targetUrl: "https://escutaativa.métodoada.com",
    ctaPosition: "bottom-left",
    ctaTone: "dark",
  },
];
