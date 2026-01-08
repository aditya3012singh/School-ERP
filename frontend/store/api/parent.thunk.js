// store/api/parent.thunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

/**
 * Get parent profile with linked student info
 */
export const fetchParentProfile = createAsyncThunk(
  "parent/profile",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/parent/profile");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

/**
 * Get child attendance (parent view)
 */
export const fetchChildAttendance = createAsyncThunk(
  "parent/attendance",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/parent/attendance");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

/**
 * Get child timetable (parent view)
 */
export const fetchChildTimetable = createAsyncThunk(
  "parent/timetable",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/parent/timetable");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

/**
 * Get child PTMs (parent view)
 */
export const fetchChildPTMs = createAsyncThunk(
  "parent/ptms",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/parent/ptms");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

/**
 * Update parent profile
 */
export const updateParentProfile = createAsyncThunk(
  "parent/updateProfile",
  async (data, thunkAPI) => {
    try {
      const res = await api.put("/parent/profile", data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

/**
 * Get all parents (Admin only)
 */
export const fetchAllParents = createAsyncThunk(
  "parent/allParents",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/parent/allparents");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
