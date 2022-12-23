import { calcTotalCount } from "../../utils/calcTotalCount";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const { items, totalCount, totalPrice } = getCartFromLS();

export const initialState: CartSliceState = {
  items,
  totalPrice,
  totalCount,
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
      state.totalPrice = calcTotalPrice(state.items);

      state.totalCount = calcTotalCount(state.items);
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

export const { addItem, remoteItem, clearItems, minusItem, refreshTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
