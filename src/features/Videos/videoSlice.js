import { createSlice } from "@reduxjs/toolkit";
export const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = [...action.payload, ...state.videos];
    },
  },
});

export const { setVideos } = videoSlice.actions;
export default videoSlice.reducer;
