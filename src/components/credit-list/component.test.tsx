// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { creditsWithUserMock } from "#/mocks/comics";

import { CreditList } from "./component";

afterEach(cleanup);

const onCreditClickSpy = vi.fn();

describe("<CreditList />", () => {
  it("renders the empty state when there are no credits", () => {
    render(<CreditList credits={[]} onCreditClick={onCreditClickSpy} />);

    expect(screen.getByText("No credits found")).toBeInTheDocument();
  });

  it("renders the usernames and role labels", () => {
    render(
      <CreditList
        credits={creditsWithUserMock}
        onCreditClick={onCreditClickSpy}
      />,
    );

    expect(screen.getByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("Writer")).toBeInTheDocument();
    expect(screen.getByText("@joaodasilva")).toBeInTheDocument();
    expect(screen.getByText("Penciller")).toBeInTheDocument();
  });

  it("calls onCreditClick with the user ID when a credit is clicked", async () => {
    const user = userEvent.setup();

    render(
      <CreditList
        credits={creditsWithUserMock}
        onCreditClick={onCreditClickSpy}
      />,
    );

    await user.click(screen.getByText("@johndoe"));

    expect(onCreditClickSpy).toHaveBeenCalledWith("40gHsx5wC4xV");

    await user.click(screen.getByText("@joaodasilva"));

    expect(onCreditClickSpy).toHaveBeenCalledWith("sOXaMS9a6t8z");
  });
});
