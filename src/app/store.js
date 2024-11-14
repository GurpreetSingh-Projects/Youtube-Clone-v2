import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import searchbarReducer from "../features/Searchbar/searchbarSlice";
import categoryReducer from "../features/Category/categorySlice";
import videosReducer from "../features/Videos/videoSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    searchbar: searchbarReducer,
    category: categoryReducer,
    videos: videosReducer,
  },
});
