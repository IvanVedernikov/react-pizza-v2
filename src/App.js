import "./App.css";
import React, { createContext, useState } from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./components/NotFoundBlock/NotFoundBlock";
import Card from "./pages/Card";

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/cart" element={<Card />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
