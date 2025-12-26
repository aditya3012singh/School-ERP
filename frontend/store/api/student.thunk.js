// store/api/student.api.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export const fetchStudentProfile = createAsyncThunk(
  "student/profile",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/student/profile");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
