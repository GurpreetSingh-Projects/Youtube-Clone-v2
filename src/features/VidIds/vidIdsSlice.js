import { createSlice } from "@reduxjs/toolkit";

export const vidIdsSlice = createSlice({
  name: "vidIds",
  initialState: {
    vidIds: [],
  },
  reducers: {
    setVidIds: (state, action) => {
      state.vidIds = action.payload;
    },
  },
});
export const { setVidIds } = vidIdsSlice.actions;
export default vidIdsSlice.reducer;
