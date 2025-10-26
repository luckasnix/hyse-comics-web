import type { UserReadingAxis } from "~/types/users";

export const axisMap: Record<UserReadingAxis, "x" | "y"> = {
  horizontal: "x",
  vertical: "y",
};
