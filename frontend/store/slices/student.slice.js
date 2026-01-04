import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentPtms, getStudentAttendance, getStudentDashboard, getStudentTimetable } from "../api/student.thunk";

const initialState = {
	ptms: [],
	timetable: [],
	attendance: [],
	dashboard: {},
	loading: false,
	error: null,
};

const studentSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		resetStudentState: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			// .addCase(fetchStudentProfile.pending, (state) => {
			// 	state.loading = true;
			// 	state.error = null;
			// })
			// .addCase(fetchStudentProfile.fulfilled, (state, action) => {
			// 	state.loading = false;
			// 	state.profile = action.payload;
			// })
			// .addCase(fetchStudentProfile.rejected, (state, action) => {
			// 	state.loading = false;
			// 	state.error = action.payload || "Failed to fetch student profile";
			// });
			.addCase(fetchStudentPtms.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchStudentPtms.fulfilled, (state, action) => {
				state.loading = false;
				state.ptms = action.payload;
			})
			.addCase(fetchStudentPtms.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch student PTMs";
			})
			.addCase(getStudentTimetable.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getStudentTimetable.fulfilled, (state, action) => {
				state.loading = false;
				state.timetable = action.payload;
			})
			.addCase(getStudentTimetable.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch student timetable";
			})
			.addCase(getStudentAttendance.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getStudentAttendance.fulfilled, (state, action) => {
				state.loading = false;
				state.attendance = action.payload;
			})
			.addCase(getStudentAttendance.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch student attendance";
			})
			.addCase(getStudentDashboard.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getStudentDashboard.fulfilled, (state, action) => {
				state.loading = false;
				state.dashboard = action.payload;
			})
			.addCase(getStudentDashboard.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch student dashboard";
			});
	},
});

export const { clearError, resetStudentState } = studentSlice.actions;
export default studentSlice.reducer;