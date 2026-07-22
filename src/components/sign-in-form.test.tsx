// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { CSSProperties, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fallbackLanguage } from "#/constants/users";
import i18n from "#/i18n";

import { SignInForm } from "./sign-in-form";

vi.mock("@tanstack/react-router", () => ({
  useParams: () => ({ locale: "pt-BR" }),
  Link: ({
    children,
    to,
    params,
    style,
  }: {
    children: ReactNode;
    to: string;
    params?: {
      locale?: string;
    };
    style?: CSSProperties;
  }) => (
    <a href={to.replace("{-$locale}", params?.locale ?? "")} style={style}>
      {children}
    </a>
  ),
}));

beforeEach(async () => {
  await i18n.changeLanguage(fallbackLanguage);
});

afterEach(cleanup);

describe("<SignInForm />", () => {
  it("renders the sign-in fields and actions", () => {
    render(<SignInForm />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Sign In" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.getByRole("button", { name: "Sign In" })).toBeEnabled();
    expect(
      screen.getByRole("button", { name: "Sign in with Google" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign in with Apple" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign up." })).toHaveAttribute(
      "href",
      "/pt-BR/sign-up",
    );
  });

  it("shows validation errors for invalid values", async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(
      await screen.findByText("Invalid email address"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Password must be at least 8 characters"),
    ).toBeInTheDocument();
  });

  it("submits and resets valid credentials", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<SignInForm />);

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    await user.type(email, "reader@example.com");
    await user.type(password, "password");
    await user.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(email).toHaveValue("");
      expect(password).toHaveValue("");
    });
    expect(consoleSpy).toHaveBeenCalledWith("Form submitted:", {
      email: "reader@example.com",
      password: "password",
    });
  });

  it("keeps the simulated social actions", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.click(
      screen.getByRole("button", { name: "Sign in with Google" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Sign in with Apple" }),
    );

    expect(consoleSpy).toHaveBeenCalledWith("Sign in with Google");
    expect(consoleSpy).toHaveBeenCalledWith("Sign in with Apple");
  });
});
