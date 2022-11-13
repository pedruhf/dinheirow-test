import React from "react";

import { Header } from "@/presentation/components";
import { Router } from "@/main/routes";

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}

export default App;
