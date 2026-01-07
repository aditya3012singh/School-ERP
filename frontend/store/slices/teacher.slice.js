import { createSlice } from "@reduxjs/toolkit";
import {
	getTeacherClasses,
	getTeacherClassAttendanceSummary,
	getTeacherTodayClasses,
	getTeacherTimetable,
	getTeacherPTMs,
	getTeacherDashboard,
	markTeacherAttendance,
} from "../api/teacher.thunk";

const initialState = {
	classes: [],
	attendanceSummary: [],
	todayClasses: [],
	timetable: [],
	ptms: [],
	dashboard: {},
	attendanceSubmitting: false,
	attendanceSuccess: false,
	loading: false,
	error: null,
};

const teacherSlice = createSlice({
	name: "teacher",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		resetTeacherState: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			/* ================= TEACHER CLASSES ================= */
			.addCase(getTeacherClasses.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTeacherClasses.fulfilled, (state, action) => {
				state.loading = false;
				state.classes = action.payload;
			})
			.addCase(getTeacherClasses.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch teacher classes";
			})

			/* ================= ATTENDANCE SUMMARY ================= */
			.addCase(getTeacherClassAttendanceSummary.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTeacherClassAttendanceSummary.fulfilled, (state, action) => {
				state.loading = false;
				state.attendanceSummary = action.payload;
			})
			.addCase(getTeacherClassAttendanceSummary.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch attendance summary";
			})

			/* ================= TODAY CLASSES ================= */
			.addCase(getTeacherTodayClasses.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTeacherTodayClasses.fulfilled, (state, action) => {
				state.loading = false;
				state.todayClasses = action.payload;
			})
			.addCase(getTeacherTodayClasses.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch today's classes";
			})

			/* ================= TIMETABLE ================= */
			.addCase(getTeacherTimetable.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTeacherTimetable.fulfilled, (state, action) => {
				state.loading = false;
				state.timetable = action.payload;
			})
			.addCase(getTeacherTimetable.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch teacher timetable";
			})

			/* ================= PTMs ================= */
			.addCase(getTeacherPTMs.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTeacherPTMs.fulfilled, (state, action) => {
				state.loading = false;
				state.ptms = action.payload;
			})
			.addCase(getTeacherPTMs.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch teacher PTMs";
			})

			/* ================= DASHBOARD ================= */
			.addCase(getTeacherDashboard.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTeacherDashboard.fulfilled, (state, action) => {
				state.loading = false;
				state.dashboard = action.payload;
			})
			.addCase(getTeacherDashboard.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch teacher dashboard";
			})

			/* ================= MARK ATTENDANCE ================= */
			.addCase(markTeacherAttendance.pending, (state) => {
				state.attendanceSubmitting = true;
				state.error = null;
				state.attendanceSuccess = false;
			})
			.addCase(markTeacherAttendance.fulfilled, (state, action) => {
				state.attendanceSubmitting = false;
				state.attendanceSuccess = true;
				state.error = null;
			})
			.addCase(markTeacherAttendance.rejected, (state, action) => {
				state.attendanceSubmitting = false;
				state.attendanceSuccess = false;
				state.error = action.payload || "Failed to mark attendance";
			});
	},
});

export const { clearError, resetTeacherState } = teacherSlice.actions;
export default teacherSlice.reducer;
