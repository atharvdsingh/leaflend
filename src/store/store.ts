import { configureStore } from "@reduxjs/toolkit";
import booksReducer  from "./features/bookSlice"
import cartReducer from "./features/cartSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
        books:booksReducer ,
        cart:cartReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
