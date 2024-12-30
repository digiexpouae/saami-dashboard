import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_EMPLOYEE ,api} from "../config/axios";

export const createemployee = createAsyncThunk('employee/create', async (payload) => {
  try {
    const server = await axios.post(CREATE_EMPLOYEE, payload);
    return server.data;
  } catch (error) {
    throw new Error("Failed to send data: " + error.message);
  }
});

export const getemployee = createAsyncThunk('employee/get', async (payload) => {
  try {
    const server = await api.post(GET_ALL_EMPLOYEE, payload);
    return server.data;
  } catch (error) {
    throw new Error("Failed to fetch data: " + error.message);
  }
});

export const updateemployee = createAsyncThunk('employee/update', async (payload) => {
  try {
    const server = await api.post(UPDATE_EMPLOYEE, payload);
    return server.data;
  } catch (error) {
    throw new Error("Failed to update data: " + error.message);
  }
});

export const deleteemployee = createAsyncThunk('employee/delete', async (payload) => {
  try {
    const server = await api.post(DELETE_EMPLOYEE, payload);
    return server.data;
  } catch (error) {
    throw new Error("Failed to delete data: " + error.message);
  }
});

    
const initialState={
    data:[]
}
const slice = createSlice({
  name: 'employee',
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    iserrorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createemployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(createemployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.iserrorMessage = action.error.message || "Failed to add employee";
      })
      .addCase(createemployee.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.iserrorMessage = "";
      })

      .addCase(getemployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload; // Replace data with fetched employees
      })
      .addCase(getemployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.iserrorMessage = action.error.message || "Failed to fetch employees";
      })
      .addCase(getemployee.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.iserrorMessage = "";
      })

      .addCase(updateemployee.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((emp) => emp.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateemployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.iserrorMessage = action.error.message || "Failed to update employee";
      })
      .addCase(updateemployee.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.iserrorMessage = "";
      })

      .addCase(deleteemployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((emp) => emp.id !== action.payload.id);
      })
      .addCase(deleteemployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.iserrorMessage = action.error.message || "Failed to delete employee";
      })
      .addCase(deleteemployee.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.iserrorMessage = "";
      });
  },
});

export default slice.reducer;