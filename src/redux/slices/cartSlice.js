import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    remoteItem(state, action) {
      state.items = state.items.filter((item) => {
        return item.id !== action.payload.id;
      });
    },

    refreshTotal(state, action) {
      state.totalPrice = state.items.reduce((summ, item) => {
        return summ + item.price * item.count;
      }, 0);

      state.totalCount = state.items.reduce((summ, item) => {
        return summ + item.count;
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count > 0) {
        findItem.count--;
      }
    },

    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectSort = (state) => state.filters.sort;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);
export const selectFilters = (state) => state.filters;
export const selectPizza = (state) => state.pizza;
export const selectCategoryId = (state) => state.filters.categoryId;

export const { addItem, remoteItem, clearItems, minusItem, refreshTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
