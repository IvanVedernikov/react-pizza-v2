import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://638bb8ec7220b45d2295a761.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading| success| error
  count: 0,
  pageCount: 0,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      console.log("данные успешно получены");
      state.items = action.payload.items;
      state.count = action.payload.count;
      state.status = "success";
      console.log(state.count / 4);
      state.pageCount = Math.ceil(state.count / 4);
    },
    [fetchPizzas.pending]: (state) => {
      console.log("Идет отправка");
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log("Была ошибка");
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setCurrentPage } = pizzaSlice.actions;

export default pizzaSlice.reducer;
