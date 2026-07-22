import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { ReactNode, SubmitEventHandler } from "react";

export type FormProps = Readonly<{
  children: ReactNode;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
}>;

export type FormTitleProps = Readonly<{
  children: ReactNode;
}>;

export type FormSubmitButtonProps = Readonly<{
  disabled: boolean;
  loading: boolean;
  icon: ReactNode;
  children: string;
}>;

const containerStyle: SxProps<Theme> = {
  padding: 6,
};

const FormContainer = ({ children, onSubmit }: FormProps) => (
  <Paper elevation={2} sx={containerStyle}>
    <Box component="form" noValidate onSubmit={onSubmit}>
      {children}
    </Box>
  </Paper>
);

const titleStyle: SxProps<Theme> = {
  paddingBottom: 4,
  textAlign: "center",
};

const FormTitle = ({ children }: FormTitleProps) => (
  <Typography variant="h3" sx={titleStyle}>
    {children}
  </Typography>
);

const FormSubmitButton = ({
  disabled,
  loading,
  icon,
  children,
}: FormSubmitButtonProps) => (
  <Button
    type="submit"
    variant="contained"
    fullWidth
    disabled={disabled}
    loading={loading}
    startIcon={icon}
  >
    {children}
  </Button>
);

export const Form = Object.assign(FormContainer, {
  Title: FormTitle,
  SubmitButton: FormSubmitButton,
});
