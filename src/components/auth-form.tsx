import Apple from "@mui/icons-material/Apple";
import Google from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

import { linkResetStyle } from "~/styles/common";

const containerStyle: SxProps<Theme> = {
  padding: 6,
};

export type AuthFormContainerProps = {
  children: ReactNode;
};

const AuthFormContainer = ({ children }: AuthFormContainerProps) => (
  <Paper elevation={2} sx={containerStyle}>
    <Box component="form">{children}</Box>
  </Paper>
);

const titleStyle: SxProps<Theme> = {
  paddingBottom: 4,
  textAlign: "center",
};

export type AuthFormTitleProps = {
  children: ReactNode;
};

const AuthFormTitle = ({ children }: AuthFormTitleProps) => (
  <Typography variant="h3" sx={titleStyle}>
    {children}
  </Typography>
);

export type AuthFormSubmitButtonProps = {
  disabled: boolean;
  loading: boolean;
  icon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string;
};

const AuthFormSubmitButton = ({
  disabled,
  loading,
  icon,
  onClick,
  children,
}: AuthFormSubmitButtonProps) => (
  <Button
    variant="contained"
    fullWidth
    type="submit"
    disabled={disabled}
    loading={loading}
    startIcon={icon}
    onClick={onClick}
  >
    {children}
  </Button>
);

const dividerStyle: SxProps<Theme> = {
  marginY: 2,
};

const AuthFormDivider = () => <Divider sx={dividerStyle}>OR</Divider>;

export type AuthFormSocialProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string;
};

const AuthFormSocialGoogleButton = ({
  onClick,
  children,
}: AuthFormSocialProps) => (
  <Button variant="outlined" fullWidth startIcon={<Google />} onClick={onClick}>
    {children}
  </Button>
);

const AuthFormSocialAppleButton = ({
  onClick,
  children,
}: AuthFormSocialProps) => (
  <Button variant="outlined" fullWidth startIcon={<Apple />} onClick={onClick}>
    {children}
  </Button>
);

const switchPromptStyle: SxProps<Theme> = {
  marginTop: 2,
  textAlign: "center",
};

const linkStyle: CSSProperties = {
  ...linkResetStyle,
  fontWeight: "bold",
};

export type AuthFormSwitchPromptProps = {
  message: string;
  linkTo: string;
  linkText: string;
};

const AuthFormSwitchPrompt = ({
  message,
  linkTo,
  linkText,
}: AuthFormSwitchPromptProps) => (
  <Typography variant="body2" sx={switchPromptStyle}>
    {message}{" "}
    <Link to={linkTo} style={linkStyle}>
      {linkText}
    </Link>
  </Typography>
);

export const AuthForm = Object.assign(AuthFormContainer, {
  Title: AuthFormTitle,
  SubmitButton: AuthFormSubmitButton,
  Divider: AuthFormDivider,
  SocialGoogleButton: AuthFormSocialGoogleButton,
  SocialAppleButton: AuthFormSocialAppleButton,
  SwitchPrompt: AuthFormSwitchPrompt,
});
