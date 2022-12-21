import "./App.css";
import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./components/NotFoundBlock/NotFoundBlock";
import Card from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Card />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
