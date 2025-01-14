import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@config/axios';
import { GET_ALL_ATTANDANCE } from '@config/axios';

interface Attendance {
  id: string;
  username: string;
  totalDuration: number;
  firstCheckIn: string;
  lastCheckOut: string;
}

interface AttendanceState {
  attendanceRecords: Attendance[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  attendanceRecords: [],
  loading: false,
  error: null,
};

// Async thunk for fetching attendance records
export const fetchAttendance = createAsyncThunk(
  'attendance/fetchAttendance',
  async (payload: { date: string; warehouseId: string }, thunkAPI) => {
    console.log(payload);

    try {
      const response = await api.post(GET_ALL_ATTANDANCE, payload);
      // console.log(response.data.data);

      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch attendance records'
      );
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default attendanceSlice.reducer;
