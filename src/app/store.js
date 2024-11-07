import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import searchbarReducer from "../features/Searchbar/searchbarSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    searchbar: searchbarReducer,
  },
});
