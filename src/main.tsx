import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={null} />
          <Route path="book/add" element={null} />
          <Route path="book/:bookId" element={null} />
          <Route path="book/:bookId/edit" element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
