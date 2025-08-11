import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: [],
  },
  reducers: {
    searchResults: (state, action) => {
      state.search = action.payload;
    },
  },
});
export const { searchResults } = searchSlice.actions;
export default searchSlice.reducer;
