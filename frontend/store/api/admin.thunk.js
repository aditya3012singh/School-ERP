// store/api/admin.api.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export const fetchTeachers = createAsyncThunk(
  "admin/fetchTeachers",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/teacher/allteachers");
      // prefer the backend's `data` wrapper when present
      return res.data?.data ?? res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createTeacher = createAsyncThunk(
  "admin/createTeacher",
  async ({ name, email, password, subject }, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/teacher", {
        name,
        email,
        password,
        subject
      });
      // backend sends a wrapper like { success, message, data }
      // return the inner `data` (the created teacher) so the slice can push it directly
      return res.data?.data ?? res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Error creating the teacher"
      );
    }
  }
);