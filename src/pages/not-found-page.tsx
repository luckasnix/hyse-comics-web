import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";

const containerStyle: SxProps<Theme> = {
  height: "100dvh",
  justifyContent: "center",
  alignItems: "center",
};

const textContainer: SxProps<Theme> = {
  textAlign: "center",
};

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="column" spacing={2} sx={containerStyle}>
      <Stack direction="column" spacing={1} sx={textContainer}>
        <Typography variant="h3">Page not found</Typography>
        <Typography variant="body1">
          Sorry, the page you are looking for does not exist.
        </Typography>
      </Stack>
      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        onClick={() => {
          navigate({ to: "/" });
        }}
      >
        Back to home
      </Button>
    </Stack>
  );
};
