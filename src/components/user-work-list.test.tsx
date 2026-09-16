import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { cleanup, render } from "vitest-browser-react/pure";

import { comicsMock } from "#/mocks/comics.ts";
import type { UserComicWork } from "#/types/comics.ts";

import { UserWorkList } from "./user-work-list.tsx";

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

afterEach(async () => {
  await cleanup();
  onWorkClickSpy.mockClear();
});

describe("<UserWorkList />", () => {
  it("renders the empty state when there are no works", async () => {
    await render(<UserWorkList works={[]} onWorkClick={onWorkClickSpy} />);

    await expect.element(page.getByText("No works found")).toBeInTheDocument();
  });

  it("renders the comic titles and role labels", async () => {
    await render(<UserWorkList works={works} onWorkClick={onWorkClickSpy} />);

    await expect
      .element(page.getByText(comicsMock[0].title))
      .toBeInTheDocument();
    await expect.element(page.getByText("Writer")).toBeInTheDocument();
    await expect
      .element(page.getByText(comicsMock[1].title))
      .toBeInTheDocument();
    await expect.element(page.getByText("Penciller")).toBeInTheDocument();
  });

  it("renders combined role labels", async () => {
    await render(
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

    await expect
      .element(page.getByText(comicsMock[0].title))
      .toBeInTheDocument();
    await expect.element(page.getByText("Writer, Editor")).toBeInTheDocument();
  });

  it("calls onWorkClick with the comic ID when a work is clicked", async () => {
    const user = userEvent.setup();

    await render(<UserWorkList works={works} onWorkClick={onWorkClickSpy} />);

    await user.click(page.getByText(comicsMock[0].title));

    expect(onWorkClickSpy).toHaveBeenCalledWith(comicsMock[0].id);

    await user.click(page.getByText(comicsMock[1].title));

    expect(onWorkClickSpy).toHaveBeenCalledWith(comicsMock[1].id);
  });

  it("renders the comic thumbnail", async () => {
    await render(
      <UserWorkList works={[works[0]]} onWorkClick={onWorkClickSpy} />,
    );

    await expect
      .element(
        page.getByRole("img", { name: `${comicsMock[0].title} thumbnail` }),
      )
      .toHaveAttribute("src", comicsMock[0].thumbnailUrl);
  });
});
