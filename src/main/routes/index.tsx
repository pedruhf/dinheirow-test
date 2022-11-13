import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeHomeComponent } from "@/main/factories/presentation/views";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={makeHomeComponent()} />
        <Route path="*" element={makeHomeComponent()} />
      </Routes>
    </BrowserRouter>
  );
};
