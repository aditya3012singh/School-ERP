// store/api/ptm.api.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

/* ================= CREATE PTM ================= */
export const createPTM = createAsyncThunk(
  "ptm/createPTM",
  async (ptmData, { rejectWithValue }) => {
    try {
      const res = await api.post("/ptm", ptmData);
      return res.data?.data ?? res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to create PTM"
      );
    }
  }
);

/* ================= FETCH PTMS ================= */
export const fetchPTMs = createAsyncThunk(
  "ptm/fetchPTMs",
  async (role, { rejectWithValue }) => {
    try {
      const endpoint = role ? `/ptm/${role.toLowerCase()}` : "/ptm";
      const res = await api.get(endpoint);
      return res.data?.data ?? res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch PTMs"
      );
    }
  }
);

/* ============ CREATE PTM FOR CLASS ============ */
export const createPTMForClass = createAsyncThunk(
  "ptm/createPTMForClass",
  async (ptmData, { rejectWithValue }) => {
    try {
      const res = await api.post("/ptm/class", ptmData);
      return res.data?.data ?? res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to create PTMs for class"
      );
    }
  }
);

// Alias for getPTMs (used in pages)
export const getPTMs = fetchPTMs;

// Re-export resetPTMState from slice for convenience
export { resetPTMState } from '../slices/ptm.slice';
export { clearError } from '../slices/ptm.slice';
