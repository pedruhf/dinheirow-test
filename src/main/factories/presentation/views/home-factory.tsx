import React from "react";

import { makeRemoteLoadCharacters } from "@/main/factories/data";
import { Home } from "@/presentation/views";

export const makeHomeComponent = () => {
  const remoteLoadCharacters = makeRemoteLoadCharacters();
  return <Home loadCharacters={remoteLoadCharacters} />;
};
