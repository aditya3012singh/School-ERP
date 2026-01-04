// store/api/student.api.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

// export const fetchStudentProfile = createAsyncThunk(
//   "student/profile",
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get("/student/profile");
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message);
//     }
//   }
// );

export const fetchStudentPtms = createAsyncThunk(
  "student/ptms",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/student/ptms");
      console.log("fetchStudentPtms response:", res.data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    } 
  }
);

export const getStudentTimetable = createAsyncThunk(
  "student/timetables",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/student/timetables");
      
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const getStudentAttendance = createAsyncThunk(
  "student/attendance",
  async(_, thunkAPI) => {
    try {
      const res = await api.get("/attendance/student/attendance");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const getStudentDashboard = createAsyncThunk(
  "student/dashboard",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/student/dashboard");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);