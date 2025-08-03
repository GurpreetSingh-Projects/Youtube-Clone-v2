import { createSlice } from "@reduxjs/toolkit";

export const channelsSlice = createSlice({
  name: "channels",
  initialState: {
    channels: "",
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
  },
});

export const { setChannels } = channelsSlice.actions;
export default channelsSlice.reducer;
