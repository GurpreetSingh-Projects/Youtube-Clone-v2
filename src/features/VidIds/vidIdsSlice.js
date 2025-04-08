import { createSlice } from "@reduxjs/toolkit";

export const vidIdsSlice = createSlice({
  name: "vidIds",
  initialState: {
    vidIds: [],
    currVidId: "",
  },
  reducers: {
    setVidIds: (state, action) => {
      state.vidIds = action.payload;
    },
    setCurrVidId: (state, action) => {
      state.currVidId = action.payload;
    },
  },
});
export const { setVidIds, setCurrVidId } = vidIdsSlice.actions;
export default vidIdsSlice.reducer;
