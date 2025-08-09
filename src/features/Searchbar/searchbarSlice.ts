import { createSlice } from "@reduxjs/toolkit";

export const searchbarSlice = createSlice({
  name: "searchbar",
  initialState: false,
  reducers: {
    searchbarToggle: (state) => {
      return !state;
    },
  },
});

export const { searchbarToggle } = searchbarSlice.actions;
export default searchbarSlice.reducer;
