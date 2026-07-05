// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { DefaultError } from "./default-error";

afterEach(cleanup);

describe("<DefaultError />", () => {
  it("renders the error heading and default description", () => {
    render(<DefaultError />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Error" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Something went wrong. Please try again later."),
    ).toBeInTheDocument();
  });
});
