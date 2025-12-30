// store/api/timetable.api.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export const fetchTimetable = createAsyncThunk(
  "timetable/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/timetable/allTimetables");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createTimetable = createAsyncThunk(
  "timetable/create",
  async ({ className, section, schedule }, { rejectWithValue }) => {  
    try {
      const res = await api.post("/timetable", {
        className,
        section,
        schedule
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||

        "Error creating the timetable"
      );
    }
  }
);  

