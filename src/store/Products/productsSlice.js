import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const productsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {},
});
// export const { } = productsSlice.actions;

export default productsSlice.reducer;
