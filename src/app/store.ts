import { configureStore } from "@reduxjs/toolkit";
import {
  counterReducer,
  searchbarReducer,
  categoryReducer,
  videosReducer,
  vidIdReducer,
  channelIdReducer,
  searchReducer,
  channelsReducer,
  suggestedReducer,
  commentsReducer,
  currChannelReducer,
} from "../components/index";
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
    suggested: suggestedReducer,
    comments: commentsReducer,
    currChannel: currChannelReducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(youtubeApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
