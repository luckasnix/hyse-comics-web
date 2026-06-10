export const getBaseUrl = (): string => {
  const fallbackUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:3001"
      : "http://localhost:3000";

  return import.meta.env.HYSE_COMICS_BASE_URL || fallbackUrl;
};
