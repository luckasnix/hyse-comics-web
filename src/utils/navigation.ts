export const getBaseUrl = (): string => {
  return import.meta.env.HYSE_COMICS_BASE_URL || "http://localhost:3001";
};
