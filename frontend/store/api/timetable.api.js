// store/api/timetable.api.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export const fetchTimetable = createAsyncThunk(
  "timetable/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/timetable");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
