import React from "react";
import { fireEvent, render, RenderResult, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";

import { LoadCharactersComics } from "@/domain/features";
import { Comic } from "@/domain/models";
import { characterMock } from "@/tests/domain/mocks";
import { CharacterDetails } from "@/presentation/views";

class LoadCharactersComicsSpy implements LoadCharactersComics {
  callsCount = 0;
  characters = [characterMock()];

  async loadAll(id: number): Promise<Comic[]> {
    this.callsCount++;
    return Promise.resolve([])
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
      <CharacterDetails loadCharactersComics={loadCharactersComicsSpy}/>
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
