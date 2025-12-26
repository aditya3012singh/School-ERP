// store/api/parent.api.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export const fetchChildren = createAsyncThunk(
  "parent/children",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/parent/children");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
