// store/api/auth.api.js
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      
      // backend sends { success, message, user }
      return res.data.data.user;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Login failed. Please try again."
      );
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");

      return res.data.data.user;
    } catch (error) {
      return rejectWithValue("Session expired");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
});