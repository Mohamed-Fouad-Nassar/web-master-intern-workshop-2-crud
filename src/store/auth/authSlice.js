import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getusers } from "../../services/usersAPI";

const initialState = {
  isLoggedIn: false,
  loading: false,
};

export const LogIn = createAsyncThunk(
  "auth/LogIn",
  async (credentials, { rejectWithValue }) => {
    const allUsers = await getusers(null, true);
    const user = allUsers.find(
      (u) =>
        u.email === credentials.email &&
        u.password === credentials.password &&
        u.role === "admin"
    );
    if (user) {
      return user;
    } else {
      return rejectWithValue("Invalid email or password");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.isLoggedIn = false), (state.loading = null);
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LogIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LogIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = payload;
        state.error = null;
      })
      .addCase(LogIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
