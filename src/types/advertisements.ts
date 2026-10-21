export type AdvertisementCtaPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type AdvertisementCtaTone = "light" | "dark";

export type Advertisement = {
  id: string;
  imageUrl: string;
  cta: {
    url: string;
    label: string;
    position: AdvertisementCtaPosition;
    tone: AdvertisementCtaTone;
  };
};
