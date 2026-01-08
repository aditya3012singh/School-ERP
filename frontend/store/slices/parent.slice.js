import { createSlice } from "@reduxjs/toolkit";
import {
  fetchParentProfile,
  fetchChildAttendance,
  fetchChildTimetable,
  fetchChildPTMs,
  updateParentProfile,
  fetchAllParents,
} from "../api/parent.thunk";

const initialState = {
  profile: null,
  attendance: [],
  timetable: [],
  ptms: [],
  allParents: [],
  loading: false,
  error: null,
};

const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetParentState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Parent Profile
      .addCase(fetchParentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchParentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch parent profile";
      })

      // Fetch Child Attendance
      .addCase(fetchChildAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChildAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addCase(fetchChildAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch child attendance";
      })

      // Fetch Child Timetable
      .addCase(fetchChildTimetable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChildTimetable.fulfilled, (state, action) => {
        state.loading = false;
        state.timetable = action.payload;
      })
      .addCase(fetchChildTimetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch child timetable";
      })

      // Fetch Child PTMs
      .addCase(fetchChildPTMs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChildPTMs.fulfilled, (state, action) => {
        state.loading = false;
        state.ptms = action.payload;
      })
      .addCase(fetchChildPTMs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch child PTMs";
      })

      // Update Parent Profile
      .addCase(updateParentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateParentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update parent profile";
      })

      // Fetch All Parents (Admin)
      .addCase(fetchAllParents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllParents.fulfilled, (state, action) => {
        state.loading = false;
        state.allParents = action.payload;
      })
      .addCase(fetchAllParents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch all parents";
      });
  },
});

export const { clearError, resetParentState } = parentSlice.actions;
export default parentSlice.reducer;
