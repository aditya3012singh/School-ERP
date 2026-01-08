// store/api/attendance.api.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export const fetchAttendance = createAsyncThunk(
  "attendance/fetch",
  async (classId, thunkAPI) => {
    try {
      const res = await api.get(`/attendance/${classId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
