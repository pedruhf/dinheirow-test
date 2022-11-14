import React from "react";
import { render, RenderResult, waitFor, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";

import { LoadCharactersComics, LoadCharactersComicsResult } from "@/domain/features";
import { CharacterDetails } from "@/presentation/views";
import { comicMock } from "@/tests/domain/mocks";

class LoadCharactersComicsSpy implements LoadCharactersComics {
  callsCount = 0;
  comics = [comicMock()];

  async loadAll(id: number): Promise<LoadCharactersComicsResult> {
    this.callsCount++;
    return Promise.resolve({
      comics: this.comics,
      totalComics: 50,
    });
  }
}

type SutTypes = {
  sut: RenderResult;
  loadCharactersComicsSpy: LoadCharactersComicsSpy;
  history: MemoryHistory;
};

const makeSut = (loadCharactersComicsSpy = new LoadCharactersComicsSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/characters/details/1"] });
  const sut = render(
    <Router navigator={history} location={history.location}>
      <CharacterDetails loadCharactersComics={loadCharactersComicsSpy} />
    </Router>
  );
  return {
    sut,
    loadCharactersComicsSpy,
    history,
  };
};

describe("CharacterDetails View", () => {
  test("Should call loadCharactersComics on start", async () => {
    const { loadCharactersComicsSpy } = makeSut();
    expect(loadCharactersComicsSpy.callsCount).toBe(1);
  });

  test("Should render a characters on success", async () => {
    const { loadCharactersComicsSpy } = makeSut();

    await waitFor(() => {
      const characterCardList = screen.getAllByTestId("comic-card");
      expect(characterCardList).toHaveLength(loadCharactersComicsSpy.comics.length);
    });
  });

  test("Should call on change page of pagination", async () => {
    const { loadCharactersComicsSpy } = makeSut();

    await waitFor(() => {
      const paginationNextButton = screen.getByTestId("pagination-next-button");
      fireEvent.click(paginationNextButton);
      const paginationPrevButton = screen.getByTestId("pagination-prev-button");
      fireEvent.click(paginationPrevButton);
    });

    expect(loadCharactersComicsSpy.callsCount).toBe(3);
  });

  test("Should return to homepage on click in back button", async () => {
    const { history } = makeSut();

    await waitFor(() => {
      const backButton = screen.getByTestId("back-button");
      fireEvent.click(backButton);
    });

    expect(history.location.pathname).toBe("/");
  });

  test("Should show error if loadCharacters fails", async () => {
    const loadCharactersComicsSpy = new LoadCharactersComicsSpy();
    jest.spyOn(loadCharactersComicsSpy, "loadAll").mockRejectedValueOnce(new Error("loadCharactersComics error"));

    makeSut(loadCharactersComicsSpy);

    await waitFor(() => {
      expect(screen.queryByTestId("load-error")).toBeInTheDocument();
    });
  });
});
