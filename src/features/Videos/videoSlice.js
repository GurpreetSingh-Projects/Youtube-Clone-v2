import { createSlice } from "@reduxjs/toolkit";
export const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    recommendedVideos: [],
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setRecommendedVideos: (state, action) => {
      state.recommendedVideos = action.payload;
    },
  },
});

export const { setVideos, setRecommendedVideos } = videoSlice.actions;
export default videoSlice.reducer;
