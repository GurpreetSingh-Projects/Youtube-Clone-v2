import { createSlice } from "@reduxjs/toolkit";

export const suggested = createSlice({
  name: "suggested",
  initialState: {
    suggested: [],
  },
  reducers: {
    setSuggested: (state, action) => {
      state.suggested = action.payload;
    },
  },
});

export const { setSuggested } = suggested.actions;
export default suggested.reducer;
