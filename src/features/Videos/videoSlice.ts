import { createSlice } from "@reduxjs/toolkit";
export const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    recommendVideos: [],
    recommendedVideos: [],
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setRecommended: (state, action) => {
      state.recommendVideos = action.payload;
    },
    setRecommendedVideos: (state, action) => {
      state.recommendedVideos = action.payload;
    },
  },
});

export const { setVideos, setRecommended, setRecommendedVideos } =
  videoSlice.actions;
export default videoSlice.reducer;
