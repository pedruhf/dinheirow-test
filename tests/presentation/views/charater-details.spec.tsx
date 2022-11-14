import React from "react";
import { render, RenderResult } from "@testing-library/react";
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
      comics: [],
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
  test("Should call loadCharactersDetails on start", async () => {
    const { loadCharactersComicsSpy } = makeSut();
    expect(loadCharactersComicsSpy.callsCount).toBe(1);
  });
});
