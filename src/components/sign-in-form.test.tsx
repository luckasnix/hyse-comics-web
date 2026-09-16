import type { CSSProperties, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { fallbackLanguage } from "#/constants/users.ts";

import { i18n } from "../../vitest.setup.ts";
import { SignInForm } from "./sign-in-form.tsx";

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
  it("renders the sign-in fields and actions", async () => {
    await render(<SignInForm />);

    await expect
      .element(page.getByRole("heading", { level: 3, name: "Sign In" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText("Email"))
      .toHaveAttribute("type", "email");
    await expect
      .element(page.getByLabelText("Password"))
      .toHaveAttribute("type", "password");
    await expect
      .element(page.getByRole("button", { name: "Sign In" }))
      .toBeEnabled();
    await expect
      .element(page.getByRole("button", { name: "Sign in with Google" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Sign in with Apple" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByRole("link", { name: "Sign up." }))
      .toHaveAttribute("href", "/pt-BR/sign-up");
  });

  it("shows validation errors for invalid values", async () => {
    const user = userEvent.setup();
    await render(<SignInForm />);

    await user.click(page.getByRole("button", { name: "Sign In" }));

    await expect
      .element(page.getByText("Invalid email address"))
      .toBeInTheDocument();
    await expect
      .element(page.getByText("Password must be at least 8 characters"))
      .toBeInTheDocument();
  });

  it("submits and resets valid credentials", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const user = userEvent.setup();
    await render(<SignInForm />);

    const email = page.getByLabelText("Email");
    const password = page.getByLabelText("Password");

    await user.type(email, "reader@example.com");
    await user.type(password, "password");
    await user.click(page.getByRole("button", { name: "Sign In" }));

    await vi.waitFor(() => {
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
    await render(<SignInForm />);

    await user.click(page.getByRole("button", { name: "Sign in with Google" }));
    await user.click(page.getByRole("button", { name: "Sign in with Apple" }));

    expect(consoleSpy).toHaveBeenCalledWith("Sign in with Google");
    expect(consoleSpy).toHaveBeenCalledWith("Sign in with Apple");
  });
});
