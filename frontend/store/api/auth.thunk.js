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

      return {
        token: res.data.data.token,
        user: res.data.data.user,
        message: res.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Login failed. Please try again."
      );
    }
  }
);
