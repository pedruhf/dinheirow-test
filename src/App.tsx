import React from "react";

import { Header } from "@/presentation/components";
import { Home } from "@/presentation/views";
import { makeRemoteLoadCharacters } from "./main/factories/data";

const remoteLoadCharacters = makeRemoteLoadCharacters();

function App() {
  return (
    <div className="App">
      <Header />
      <Home loadCharacters={remoteLoadCharacters} />
    </div>
  );
}

export default App;
