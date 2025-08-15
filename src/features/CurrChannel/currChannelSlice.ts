import { createSlice } from "@reduxjs/toolkit";

export const CurrChannelSlice = createSlice({
  name: "currChannel",
  initialState: {
    channelId: "",
    playlistId: "",
    playlist: [],
  },
  reducers: {
    setChannelId: (state, action) => {
      state.channelId = action.payload;
    },
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
  },
});

export const { setChannelId, setPlaylistId, setPlaylist } =
  CurrChannelSlice.actions;
export default CurrChannelSlice.reducer;
