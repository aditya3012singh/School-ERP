// store/api/admin.api.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export const fetchTeachers = createAsyncThunk(
  "admin/fetchTeachers",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/teachers");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
