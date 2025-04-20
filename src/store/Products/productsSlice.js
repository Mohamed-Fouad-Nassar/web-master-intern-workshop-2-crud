import { createSlice } from "@reduxjs/toolkit";
import {
  createNewProduct,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  getProductByID,
  updateProduct,
} from "../../api/products";

const initialState = {
  products: [],
  currentProducts: [],
  categories: [],
  product: {},
  isLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProducts = action.payload;
        state.products = [...state.products, action.payload];
      })
      .addCase(getProductByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(action.payload.id);
        state.currentProducts = state.currentProducts.filter(
          (product) => product.id !== action.payload.id
        );
        state.isLoading = false;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = [...state.products, action.payload];
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          state.error = action.error.message;
          state.isLoading = false;
        }
      );
  },
});

export default productsSlice.reducer;
