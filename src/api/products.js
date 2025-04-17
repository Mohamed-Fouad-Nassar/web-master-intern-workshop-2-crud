import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// for getting single product
export const getProductByID = createAsyncThunk(
  "products/getSingleProduct",
  async (id, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// for updating products
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${data.id}`,data
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//for create new product
export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (data, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await axios.post(
        "https://api.escuelajs.co/api/v1/products",
        data
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);
// for getting all the categories
export const getAllCategories = createAsyncThunk(
  "Categories/getAllCategories",
  async (_, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await axios.get("https://api.escuelajs.co/api/v1/categories");
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);
