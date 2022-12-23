import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export type PizzaItems = {
  items: Pizza[];
  count: number;
};

export interface PizzaSliceState {
  items: Array<Pizza>;
  status: Status;
  count: number;
  pageCount: number;
}

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

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

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading| success| error
  count: 0,
  pageCount: 0,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.count = action.payload.count;
      state.pageCount = Math.ceil(state.count / 4);
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
  // extraReducers: {
  //   [fetchPizzas.fulfilled]: (
  //     state: RootState,
  //     action: PayloadAction<PizzaSliceState>
  //   ) => {
  //     console.log("данные успешно получены");
  //     state.items = action.payload.items;
  //     state.count = action.payload.count;
  //     state.status = "success";
  //     state.pageCount = Math.ceil(state.count / 4);
  //   },
  //   [fetchPizzas.pending]: (state: RootState) => {
  //     console.log("Идет отправка");
  //     state.status = "loading";
  //     state.items = [];
  //   },
  //   [fetchPizzas.rejected]: (state: RootState) => {
  //     console.log("Была ошибка");
  //     state.status = "error";
  //     state.items = [];
  //   },
  // },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
