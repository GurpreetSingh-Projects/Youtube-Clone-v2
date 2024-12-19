// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import searchbarReducer from "../features/Searchbar/searchbarSlice";
import categoryReducer from "../features/Category/categorySlice";
import videosReducer from "../features/Videos/videoSlice";
import vidIdReducer from "../features/VidIds/vidIdsSlice";
import channelIdReducer from "../features/ChannelIds/channelidsSlice";
import searchReducer from "../features/Search/searchSlice";
import channelsReducer from "../features/Channels/channelsSlice";
import { youtubeApi } from "../features/FetchApi/fetchapi";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    searchbar: searchbarReducer,
    category: categoryReducer,
    videos: videosReducer,
    vidIds: vidIdReducer,
    search: searchReducer,
    channelIds: channelIdReducer,
    channels: channelsReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(youtubeApi.middleware),
});
