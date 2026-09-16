import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { creditsWithUserMock } from "#/mocks/comics.ts";

import { CreditList } from "./credit-list.tsx";

afterEach(cleanup);

const onCreditClickSpy = vi.fn();

describe("<CreditList />", () => {
  it("renders the empty state when there are no credits", async () => {
    await render(<CreditList credits={[]} onCreditClick={onCreditClickSpy} />);

    await expect
      .element(page.getByText("No credits found"))
      .toBeInTheDocument();
  });

  it("renders the usernames and role labels", async () => {
    await render(
      <CreditList
        credits={creditsWithUserMock}
        onCreditClick={onCreditClickSpy}
      />,
    );

    await expect.element(page.getByText("@johndoe")).toBeInTheDocument();
    await expect.element(page.getByText("Writer")).toBeInTheDocument();
    await expect.element(page.getByText("@joaodasilva")).toBeInTheDocument();
    await expect.element(page.getByText("Penciller")).toBeInTheDocument();
  });

  it("renders combined role labels", async () => {
    await render(
      <CreditList
        credits={[
          {
            user: creditsWithUserMock[0].user,
            roles: ["comics:writer", "comics:editor"],
          },
        ]}
        onCreditClick={onCreditClickSpy}
      />,
    );

    await expect.element(page.getByText("@johndoe")).toBeInTheDocument();
    await expect.element(page.getByText("Writer, Editor")).toBeInTheDocument();
  });

  it("calls onCreditClick with the user ID when a credit is clicked", async () => {
    const user = userEvent.setup();

    await render(
      <CreditList
        credits={creditsWithUserMock}
        onCreditClick={onCreditClickSpy}
      />,
    );

    await user.click(page.getByText("@johndoe"));

    expect(onCreditClickSpy).toHaveBeenCalledWith("40gHsx5wC4xV");

    await user.click(page.getByText("@joaodasilva"));

    expect(onCreditClickSpy).toHaveBeenCalledWith("sOXaMS9a6t8z");
  });

  it("renders a fallback avatar when avatarUrl is null", async () => {
    await render(
      <CreditList
        credits={[
          {
            user: { ...creditsWithUserMock[0].user, avatarUrl: null },
            roles: creditsWithUserMock[0].roles,
          },
        ]}
        onCreditClick={onCreditClickSpy}
      />,
    );

    await expect
      .element(page.getByRole("img"))
      .toHaveAttribute("src", "/fallbacks/avatar.webp");
  });
});
