import type { Comic } from "./comics.ts";

export type Recommendation = {
  id: string;
  title: string;
  comics: Array<Comic>;
};
