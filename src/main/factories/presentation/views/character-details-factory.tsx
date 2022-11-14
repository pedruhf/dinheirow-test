import React from "react";

import { CharacterDetails } from "@/presentation/views";
import { makeLoadCharactersComics } from "@/main/factories/data";

export const makeCharacterDetailsComponent = () => {
  return <CharacterDetails loadCharactersComics={makeLoadCharactersComics()} />;
};
