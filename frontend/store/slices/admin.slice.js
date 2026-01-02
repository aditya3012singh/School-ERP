import { createSlice } from "@reduxjs/toolkit";
import {
  createStudent,
  createTeacher,
  fetchStudents,
  fetchTeachers,
  fetchParents,
  fetchDashboardStats,
} from "../api/admin.thunk";

const initialState = {
  teachers: [],
  students: [],
  parents: [], // ✅ ADD THIS
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAdminState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      /* ================= TEACHERS ================= */
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch teachers";
      })

      .addCase(createTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.teachers.push(action.payload);
        }
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create teacher";
      })

      /* ================= STUDENTS ================= */
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch students";
      })

      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.students.push(action.payload);
        }
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create student";
      })

      /* ================= PARENTS ================= */
      .addCase(fetchParents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.loading = false;
        state.parents = action.payload; // ✅ STORE PARENTS
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch parents";
      });
  },
});

export const { clearError, resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
