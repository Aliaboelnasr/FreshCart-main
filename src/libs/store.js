import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { productReducer } from "./productSlice";

export const store = configureStore({
  reducer: {
    myCounter: counterReducer,
    myProduct: productReducer
  },
});
