// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ComicProvider } from "#/contexts/comic";
import { UserProvider } from "#/contexts/user";
import { chaptersMock, comicsMock, pagesMock } from "#/mocks/comics";
import { signedInUserMock, usersMock } from "#/mocks/users";
import type { Comic, Page } from "#/types/comics";
import type { User } from "#/types/users";

import { ComicReaderViewport } from "./comic-reader-viewport";

const easternComic = comicsMock[0];
const westernComic = comicsMock[1];
const chapters = chaptersMock.slice(0, 2);
const pages = pagesMock.slice(0, 3);

const carouselRefSpy = (() => {}) as unknown as ReturnType<
  typeof import("embla-carousel-react").default
>[0];

type RenderComponentOptions = {
  comic: Comic;
  user: User | null;
  pages: Array<Page>;
};

const defaultRenderOptions: RenderComponentOptions = {
  comic: easternComic,
  user: signedInUserMock,
  pages,
};

const renderComponent = (overrides: Partial<RenderComponentOptions> = {}) => {
  const { comic, user, pages } = {
    ...defaultRenderOptions,
    ...overrides,
  };

  return render(
    <UserProvider user={user}>
      <ComicProvider
        comic={comic}
        chapters={chapters}
        pages={pages}
        currentComicId={comic.id}
        currentChapterId={chapters[0].id}
      >
        <ComicReaderViewport carouselRef={carouselRefSpy} />
      </ComicProvider>
    </UserProvider>,
  );
};

afterEach(cleanup);

describe("<ComicReaderViewport />", () => {
  it("renders all page images", () => {
    renderComponent();

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(pages.length);
  });

  it("renders unique alt text with the comic title and page position", () => {
    renderComponent();

    const images = screen.getAllByRole("img");

    for (const [index, image] of images.entries()) {
      expect(image).toHaveAttribute(
        "alt",
        `${easternComic.title} page ${index + 1} of ${pages.length}`,
      );
    }
  });

  it("renders the correct image sources", () => {
    renderComponent();

    const images = screen.getAllByRole("img");

    for (const [index, image] of images.entries()) {
      expect(image).toHaveAttribute("src", pages[index].imageUrl);
    }
  });

  it("renders page images with box-safe sizing", () => {
    renderComponent();

    const images = screen.getAllByRole("img");

    for (const image of images) {
      expect(image).toHaveStyle({
        boxSizing: "border-box",
        maxWidth: "100%",
        maxHeight: "100%",
      });
    }
  });

  it("renders no images when pages are empty", () => {
    renderComponent({ pages: [] });

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("applies background texture style when page has a background texture", () => {
    const pagesWithTexture = pagesMock.filter(
      (page) => page.backgroundTexture !== null,
    );

    renderComponent({ pages: pagesWithTexture.slice(0, 2) });

    const images = screen.getAllByRole("img");

    for (const image of images) {
      expect(image.parentElement).toHaveStyle({
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      });
    }
  });

  it("does not apply background texture style when page has no background texture", () => {
    const pagesWithoutTexture = pagesMock.filter(
      (page) => page.backgroundTexture === null,
    );

    renderComponent({ pages: pagesWithoutTexture.slice(0, 2) });

    const images = screen.getAllByRole("img");

    for (const image of images) {
      const style = image.parentElement?.style;

      expect(style?.backgroundImage).toBeFalsy();
    }
  });

  it("renders with column direction for vertical reading axis", () => {
    renderComponent({ user: signedInUserMock });

    const images = screen.getAllByRole("img");
    const slideContainer = images[0].parentElement?.parentElement;

    expect(slideContainer).toHaveStyle({
      flexDirection: "column",
      touchAction: "pan-x pinch-zoom",
    });
  });

  it("falls back to column direction when no user is available", () => {
    renderComponent({ user: null });

    const images = screen.getAllByRole("img");
    const slideContainer = images[0].parentElement?.parentElement;

    expect(slideContainer).toHaveStyle({ flexDirection: "column" });
  });

  it("renders with row direction for horizontal reading axis and western comic", () => {
    const horizontalUser = usersMock[2];

    renderComponent({ user: horizontalUser, comic: westernComic });

    const images = screen.getAllByRole("img");
    const slideContainer = images[0].parentElement?.parentElement;

    expect(slideContainer).toHaveStyle({
      flexDirection: "row",
      touchAction: "pan-y pinch-zoom",
    });
  });

  it("renders with row-reverse direction for horizontal reading axis and eastern comic", () => {
    const horizontalUser = usersMock[2];

    renderComponent({ user: horizontalUser, comic: easternComic });

    const images = screen.getAllByRole("img");
    const slideContainer = images[0].parentElement?.parentElement;

    expect(slideContainer).toHaveStyle({
      flexDirection: "row-reverse",
      touchAction: "pan-y pinch-zoom",
    });
  });
});
