import React from "react";
import { fireEvent, render, RenderResult, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";

import { Home } from "@/presentation/views";
import { LoadCharacters } from "@/domain/features";
import { Character } from "@/domain/models";
import { characterMock } from "@/tests/domain/mocks";

class LoadCharactersSpy implements LoadCharacters {
  callsCount = 0;
  characters = [characterMock()];

  async loadAll(page: number, limit: number): Promise<Character[]> {
    this.callsCount++;
    return Promise.resolve(this.characters);
  }
}

type SutTypes = {
  sut: RenderResult;
  loadCharactersSpy: LoadCharactersSpy;
  history: MemoryHistory;
};

const makeSut = (loadCharactersSpy = new LoadCharactersSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const sut = render(
    <Router navigator={history} location={history.location}>
      <Home loadCharacters={loadCharactersSpy} />
    </Router>
  );
  return {
    sut,
    loadCharactersSpy,
    history,
  };
};

describe("Home View", () => {
  test("Should call loadCharacters on start", async () => {
    const { loadCharactersSpy } = makeSut();
    expect(loadCharactersSpy.callsCount).toBe(1);
  });

  test("Should render a characters on success", async () => {
    const { loadCharactersSpy } = makeSut();

    await waitFor(() => {
      const characterCardList = screen.getAllByTestId("character-card");
      expect(characterCardList).toHaveLength(loadCharactersSpy.characters.length);
    });
  });

  test("Should call on change page of pagination", async () => {
    const { loadCharactersSpy } = makeSut();

    await waitFor(() => {
      const paginationNextButton = screen.getByTestId("pagination-next-button");
      fireEvent.click(paginationNextButton);
      const paginationPrevButton = screen.getByTestId("pagination-prev-button");
      fireEvent.click(paginationPrevButton);
    });

    expect(loadCharactersSpy.callsCount).toBe(3);
  });

  test("Should show error if loadCharacters fails", async () => {
    const loadCharactersSpy = new LoadCharactersSpy();
    jest.spyOn(loadCharactersSpy, "loadAll").mockRejectedValueOnce(new Error("loadCharacters error"));

    makeSut(loadCharactersSpy);

    await waitFor(() => {
      expect(screen.queryByTestId("load-error")).toBeInTheDocument();
    });
  });

  test("Should navigate to character/details on click", async () => {
    const { history } = makeSut();

    await waitFor(() => {
      const link = screen.getByTestId("link");
      fireEvent.click(link);
      expect(history.location.pathname).toBe("/characters/details/1");
    });
  });
});
