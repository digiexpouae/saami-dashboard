import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@config/axios';
import { GET_EMPLOYEE_SUMMARY } from '@config/axios';

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

// Async thunk for fetching attendance records based on the date range and employee ID
export const fetchAttendanceSummary = createAsyncThunk(
  'attendance/fetchAttendance',
  async (
    payload: { fromDate: string; toDate: string; employeeId: string },
    thunkAPI
  ) => {
    console.log(payload);

    try {
      const response = await api.post(GET_EMPLOYEE_SUMMARY, payload);
      console.log(response);

      return response.data.data; // Assuming this is the structure returned by the API
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch attendance records'
      );
    }
  }
);

const attendanceSummarySlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = action.payload;
      })
      .addCase(fetchAttendanceSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default attendanceSummarySlice.reducer;
