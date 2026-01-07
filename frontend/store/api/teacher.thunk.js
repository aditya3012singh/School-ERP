import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTeacherClasses= createAsyncThunk(
  "teacher/classes",
  async (_, thunkAPI) => {
    try {
        const res = await api.get("/teacher/classes");
        return res.data?.data ?? [];
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const getTeacherClassAttendanceSummary = createAsyncThunk(
  "teacher/attendance-summary",
  async ({ className, section }, thunkAPI) => {
    try {
        const res = await api.get("/teacher/attendance-summary", {
            params: { className, section }
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

export const getTeacherTodayClasses = createAsyncThunk(
    "teacher/today-classes",
    async (_, thunkAPI) => {
      try {
          const res = await api.get("/teacher/today");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

export const getTeacherTimetable = createAsyncThunk(
  "teacher/timetables",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/timetable/teacher");
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message);   
    }
    }
);

export const getTeacherPTMs= createAsyncThunk(
  "teacher/ptms",
  async (_, thunkAPI) => {
    try {
        const res = await api.get("/ptm/teacher");
        return res.data;
    } catch (err) { 
        return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const getTeacherDashboard = createAsyncThunk(
  "teacher/dashboard",
  async (_, thunkAPI) => {
    try {
        const res = await api.get("/teacher/dashboard");
        return res.data;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const markTeacherAttendance = createAsyncThunk(
  "teacher/mark-attendance",
  async ({ subjectId, date, records }, thunkAPI) => {
    try {
      const res = await api.post("/attendance", {
        subjectId,
        date,
        records,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);