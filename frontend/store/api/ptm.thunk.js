import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { 
  createPTMRequest, 
  createPTMSuccess, 
  createPTMFailure,
  getPTMsRequest,
  getPTMsSuccess,
  getPTMsFailure,
  resetPTMState
} from '../slices/ptm.slice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create PTM
export const createPTM = createAsyncThunk(
  'ptm/createPTM',
  async (ptmData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(createPTMRequest());
      
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const { data } = await axios.post(`${API_URL}/ptm`, ptmData, config);
      
      dispatch(createPTMSuccess(data.data));
      toast.success('PTM scheduled successfully!');
      return data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to schedule PTM';
      dispatch(createPTMFailure(message));
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get PTMs by role (Student/Parent/Teacher)
export const getPTMs = createAsyncThunk(
  'ptm/getPTMs',
  async (role, { dispatch, rejectWithValue }) => {
    try {
      dispatch(getPTMsRequest());
      
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const endpoint = role ? `/ptm/${role.toLowerCase()}` : '/ptm';
      const { data } = await axios.get(`${API_URL}${endpoint}`, config);
      
      dispatch(getPTMsSuccess(data.data));
      return data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch PTMs';
      dispatch(getPTMsFailure(message));
      return rejectWithValue(message);
    }
  }
);

// Create PTM for all students in a class
export const createPTMForClass = createAsyncThunk(
  'ptm/createPTMForClass',
  async (ptmData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(createPTMRequest());
      
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const { data } = await axios.post(`${API_URL}/ptm/class`, ptmData, config);
      
      toast.success('PTMs scheduled for class successfully!');
      return data.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to schedule PTMs for class';
      dispatch(createPTMFailure(message));
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export { resetPTMState };