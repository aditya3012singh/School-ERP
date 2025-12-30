import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ptms: [],
  loading: false,
  error: null,
  success: false,
};

const ptmSlice = createSlice({
  name: 'ptm',
  initialState,
  reducers: {
    // Request actions
    createPTMRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    getPTMsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Success actions
    createPTMSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.ptms.push(action.payload);
    },
    getPTMsSuccess: (state, action) => {
      state.loading = false;
      state.ptms = action.payload;
    },
    
    // Failure actions
    createPTMFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPTMsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Reset actions
    resetPTMState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  createPTMRequest,
  createPTMSuccess,
  createPTMFailure,
  getPTMsRequest,
  getPTMsSuccess,
  getPTMsFailure,
  resetPTMState,
} = ptmSlice.actions;

export default ptmSlice.reducer;