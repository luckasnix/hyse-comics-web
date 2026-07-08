import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  IconBrandAppleFilled,
  IconBrandGoogleFilled,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import type {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  SubmitEventHandler,
} from "react";
import { useTranslation } from "react-i18next";

import { linkResetStyle } from "#/styles/common";

export type AuthFormContainerProps = Readonly<{
  children: ReactNode;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
}>;

export type AuthFormTitleProps = Readonly<{
  children: ReactNode;
}>;

export type AuthFormSubmitButtonProps = Readonly<{
  disabled: boolean;
  loading: boolean;
  icon: ReactNode;
  children: string;
}>;

export type AuthFormSocialProps = Readonly<{
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string;
}>;

export type AuthFormSwitchPromptProps = Readonly<{
  message: string;
  linkTo: string;
  linkParams?: Record<string, string | undefined>;
  linkText: string;
}>;

const containerStyle: SxProps<Theme> = {
  padding: 6,
};

const AuthFormContainer = ({ children, onSubmit }: AuthFormContainerProps) => (
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

const AuthFormTitle = ({ children }: AuthFormTitleProps) => (
  <Typography variant="h3" sx={titleStyle}>
    {children}
  </Typography>
);

const AuthFormSubmitButton = ({
  disabled,
  loading,
  icon,
  children,
}: AuthFormSubmitButtonProps) => (
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

const dividerStyle: SxProps<Theme> = {
  marginY: 2,
};

const AuthFormDivider = () => {
  const { t } = useTranslation();
  return <Divider sx={dividerStyle}>{t("common.or")}</Divider>;
};

const AuthFormSocialGoogleButton = ({
  onClick,
  children,
}: AuthFormSocialProps) => (
  <Button
    type="button"
    variant="outlined"
    fullWidth
    startIcon={<IconBrandGoogleFilled />}
    onClick={onClick}
  >
    {children}
  </Button>
);

const AuthFormSocialAppleButton = ({
  onClick,
  children,
}: AuthFormSocialProps) => (
  <Button
    type="button"
    variant="outlined"
    fullWidth
    startIcon={<IconBrandAppleFilled />}
    onClick={onClick}
  >
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

const AuthFormSwitchPrompt = ({
  message,
  linkTo,
  linkParams,
  linkText,
}: AuthFormSwitchPromptProps) => (
  <Typography variant="body2" sx={switchPromptStyle}>
    {message}{" "}
    <Link to={linkTo} params={linkParams} style={linkStyle}>
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
