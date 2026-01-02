import { createSlice } from "@reduxjs/toolkit";
import {
  createPTM,
  fetchPTMs,
  createPTMForClass,
} from "../api/ptm.thunk.js";

const initialState = {
  ptms: [],
  loading: false,
  error: null,
  success: false,
};

const ptmSlice = createSlice({
  name: "ptm",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetPTMState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      /* ================= CREATE PTM ================= */
      .addCase(createPTM.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPTM.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload) {
          state.ptms.push(action.payload);
        }
      })
      .addCase(createPTM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create PTM";
      })

      /* ================= FETCH PTMS ================= */
      .addCase(fetchPTMs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPTMs.fulfilled, (state, action) => {
        state.loading = false;
        state.ptms = action.payload;
      })
      .addCase(fetchPTMs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch PTMs";
      })

      /* ============ CREATE PTM FOR CLASS ============ */
      .addCase(createPTMForClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPTMForClass.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createPTMForClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create PTMs for class";
      });
  },
});

export const { clearError, resetPTMState } = ptmSlice.actions;
export default ptmSlice.reducer;
