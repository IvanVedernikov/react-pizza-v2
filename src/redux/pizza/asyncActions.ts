import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItems, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<PizzaItems, SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<PizzaItems>(
      `https://638bb8ec7220b45d2295a761.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
