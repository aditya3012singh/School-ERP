import { createSlice } from "@reduxjs/toolkit";
import {
  createStudent,
  createTeacher,
  fetchSubjects,
  fetchStudents,
  fetchTeachers,
  fetchParents,
  fetchDashboardStats,
  inviteParent,
  addParentToStudent,
} from "../api/admin.thunk";

const initialState = {
  subjects: [],
  subjectsLoading: false,
  subjectsError: null,
  teachers: [],
  students: [],
  parents: [], // ✅ ADD THIS
  loading: false,
  error: null,
  inviteLoading: false,
  inviteSuccess: null,
  inviteError: null,
  addParentLoading: false,
  addParentSuccess: null,
  addParentError: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.subjectsError = null;
    },
    resetAdminState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      /* ================= SUBJECTS ================= */
      .addCase(fetchSubjects.pending, (state) => {
        state.subjectsLoading = true;
        state.subjectsError = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjectsLoading = false;
        state.subjects = action.payload || [];
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.subjectsLoading = false;
        state.subjectsError = action.payload || "Failed to fetch subjects";
      })

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
      })

      /* ================= INVITE PARENT ================= */
      .addCase(inviteParent.pending, (state) => {
        state.inviteLoading = true;
        state.inviteError = null;
        state.inviteSuccess = null;
      })
      .addCase(inviteParent.fulfilled, (state, action) => {
        state.inviteLoading = false;
        state.inviteSuccess = action.payload || "Invitation sent";
      })
      .addCase(inviteParent.rejected, (state, action) => {
        state.inviteLoading = false;
        state.inviteError = action.payload || "Failed to invite parent";
      })

      /* ================= DIRECT PARENT CREATION ================= */
      .addCase(addParentToStudent.pending, (state) => {
        state.addParentLoading = true;
        state.addParentError = null;
        state.addParentSuccess = null;
      })
      .addCase(addParentToStudent.fulfilled, (state, action) => {
        state.addParentLoading = false;
        state.addParentSuccess = "Parent created and linked";
        if (action.payload) {
          state.parents = [...(state.parents || []), action.payload];
        }
      })
      .addCase(addParentToStudent.rejected, (state, action) => {
        state.addParentLoading = false;
        state.addParentError = action.payload || "Failed to add parent";
      });
  },
});

export const { clearError, resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
