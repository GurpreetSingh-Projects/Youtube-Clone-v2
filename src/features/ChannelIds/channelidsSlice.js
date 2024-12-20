import { createSlice } from "@reduxjs/toolkit";

export const channelIdsSlice = createSlice({
  name: "channelids",
  initialState: {
    channelIds: "",
  },
  reducers: {
    setChannelIds: (state, action) => {
      state.channelIds = action.payload;
    },
  },
});

export const { setChannelIds } = channelIdsSlice.actions;
export default channelIdsSlice.reducer;
