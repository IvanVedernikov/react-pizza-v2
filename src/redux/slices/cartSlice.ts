import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;
};
export interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: Array<CartItem>;
}

export const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    remoteItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => {
        return item.id !== action.payload;
      });
    },

    refreshTotal(state) {
      state.totalPrice = state.items.reduce((summ, item) => {
        return summ + item.price * item.count;
      }, 0);

      state.totalCount = state.items.reduce((summ, item) => {
        return summ + item.count;
      }, 0);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 0) {
        findItem.count--;
      }
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectSort = (state: RootState) => state.filters.sort;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItem) => obj.id === id);
export const selectFilters = (state: RootState) => state.filters;
export const selectPizza = (state: RootState) => state.pizza;
export const selectCategoryId = (state: RootState) => state.filters.categoryId;

export const { addItem, remoteItem, clearItems, minusItem, refreshTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
