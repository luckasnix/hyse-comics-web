import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

import { AdvertisementShelf } from "#/components/advertisement-shelf.tsx";
import type { Advertisement } from "#/types/advertisements.ts";

const containerStyle: SxProps<Theme> = {
  width: "100%",
  paddingY: 3,
};

export type AdvertisementsSectionProps = Readonly<{
  advertisements: Array<Advertisement>;
}>;

export const AdvertisementsSection = ({
  advertisements,
}: AdvertisementsSectionProps) => {
  if (advertisements.length === 0) {
    return null;
  }

  return (
    <Box component="section" sx={containerStyle}>
      <AdvertisementShelf advertisements={advertisements} />
    </Box>
  );
};
