import React from "react";
import { fireEvent, render, RenderResult, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";

import { LoadCharactersDetails } from "@/domain/features";
import { Character } from "@/domain/models";
import { characterMock } from "@/tests/domain/mocks";
import { CharacterDetails } from "@/presentation/views";

class LoadCharactersSpy implements LoadCharactersDetails {
  callsCount = 0;
  characters = [characterMock()];

  async load(id: number): Promise<Character> {
    this.callsCount++;
    return Promise.resolve(characterMock())
  }
}

type SutTypes = {
  sut: RenderResult;
  loadCharactersDetailsSpy: LoadCharactersSpy;
  history: MemoryHistory;
};

const makeSut = (loadCharactersDetailsSpy = new LoadCharactersSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/characters/details/1"] });
  const sut = render(
    <Router navigator={history} location={history.location}>
      <CharacterDetails loadCharactersDetails={loadCharactersDetailsSpy}/>
    </Router>
  );
  return {
    sut,
    loadCharactersDetailsSpy,
    history,
  };
};

describe("CharacterDetails View", () => {
  test("Should call loadCharactersDetails on start", async () => {
    const { loadCharactersDetailsSpy } = makeSut();
    expect(loadCharactersDetailsSpy.callsCount).toBe(1);
  });
});
