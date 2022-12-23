import { CartItem } from "./types";
import { RootState } from "../store";
export const selectCart = (state: RootState) => state.cart;
export const selectSort = (state: RootState) => state.filters.sort;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItem) => obj.id === id);
export const selectCategoryId = (state: RootState) => state.filters.categoryId;
