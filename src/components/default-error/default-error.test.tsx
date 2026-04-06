// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { DefaultError } from "./default-error";

afterEach(cleanup);

describe("<DefaultError />", () => {
  it("renders the error heading and message", () => {
    render(<DefaultError error={new Error("Failed to load page")} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Erro" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Failed to load page")).toBeInTheDocument();
  });
});
