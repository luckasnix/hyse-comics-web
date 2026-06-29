// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { comicsMock } from "#/mocks/comics";
import type { UserComicWork } from "#/types/comics";

import { UserWorkList } from "./user-work-list";

const works: Array<UserComicWork> = [
  {
    comic: comicsMock[0],
    roles: ["comics:writer"],
  },
  {
    comic: comicsMock[1],
    roles: ["comics:penciller"],
  },
];

const onWorkClickSpy = vi.fn();

afterEach(() => {
  cleanup();
  onWorkClickSpy.mockClear();
});

describe("<UserWorkList />", () => {
  it("renders the empty state when there are no works", () => {
    render(<UserWorkList works={[]} onWorkClick={onWorkClickSpy} />);

    expect(screen.getByText("No works found")).toBeInTheDocument();
  });

  it("renders the comic titles and role labels", () => {
    render(<UserWorkList works={works} onWorkClick={onWorkClickSpy} />);

    expect(screen.getByText(comicsMock[0].title)).toBeInTheDocument();
    expect(screen.getByText("Writer")).toBeInTheDocument();
    expect(screen.getByText(comicsMock[1].title)).toBeInTheDocument();
    expect(screen.getByText("Penciller")).toBeInTheDocument();
  });

  it("renders combined role labels", () => {
    render(
      <UserWorkList
        works={[
          {
            comic: comicsMock[0],
            roles: ["comics:writer", "comics:editor"],
          },
        ]}
        onWorkClick={onWorkClickSpy}
      />,
    );

    expect(screen.getByText(comicsMock[0].title)).toBeInTheDocument();
    expect(screen.getByText("Writer, Editor")).toBeInTheDocument();
  });

  it("calls onWorkClick with the comic ID when a work is clicked", async () => {
    const user = userEvent.setup();

    render(<UserWorkList works={works} onWorkClick={onWorkClickSpy} />);

    await user.click(screen.getByText(comicsMock[0].title));

    expect(onWorkClickSpy).toHaveBeenCalledWith(comicsMock[0].id);

    await user.click(screen.getByText(comicsMock[1].title));

    expect(onWorkClickSpy).toHaveBeenCalledWith(comicsMock[1].id);
  });

  it("renders the comic thumbnail", () => {
    render(<UserWorkList works={[works[0]]} onWorkClick={onWorkClickSpy} />);

    expect(
      screen.getByRole("img", { name: `${comicsMock[0].title} thumbnail` }),
    ).toHaveAttribute("src", comicsMock[0].thumbnailUrl);
  });
});
