export type UserReadingAxis = "horizontal" | "vertical";

export type UserReading = {
  axis: UserReadingAxis;
};

export type User = {
  reading: UserReading;
};
