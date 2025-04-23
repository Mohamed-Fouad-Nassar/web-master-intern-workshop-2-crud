import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://api.escuelajs.co/api/v1";

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
  isLoading: false,
  error: null,
};

// logging in
export const LogIn = createAsyncThunk(
  "auth/LogIn",
  async (payloadUser, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, payloadUser);
      const { access_token } = res.data;

      localStorage.setItem("token", access_token);

      return access_token;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

// fetch for the user profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      if (!token) throw new Error("No token found");

      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      state.error = null;

      // Remove the token from localStorage
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(LogIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(LogIn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = payload;
        state.error = null;
      })
      .addCase(LogIn.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.token = null;
        state.error = payload;
      })

      // Handle fetching profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
