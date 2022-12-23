import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filters from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: { filters, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
