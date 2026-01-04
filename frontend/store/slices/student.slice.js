import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentProfile } from "../api/student.thunk";

const initialState = {
	profile: null,
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
			.addCase(fetchStudentProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchStudentProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.profile = action.payload;
			})
			.addCase(fetchStudentProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to fetch student profile";
			});
	},
});

export const { clearError, resetStudentState } = studentSlice.actions;
export default studentSlice.reducer;