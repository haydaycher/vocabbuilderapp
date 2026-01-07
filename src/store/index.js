import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./wordsSlice";
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    words: wordsReducer,
    categories: categoriesReducer,
  },
});
