import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CREATE_EMPLOYEE,
  GET_ALL_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  api,
} from "../config/axios";

// Create Employee
export const createEmployee = createAsyncThunk(
  "employee/create",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    
    try {
      const response = await api.post(CREATE_EMPLOYEE, payload);
      if (!response.data) {
        throw new Error("No data returned from server");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get All Employees
export const getEmployees = createAsyncThunk(
  "employee/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(GET_ALL_EMPLOYEE);
      console.log(response.data.data);
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Employee
export const updateEmployee = createAsyncThunk(
  "employee/update",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    
    try {
      const response = await api.put(`${UPDATE_EMPLOYEE}/${payload.id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete Employee
export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${DELETE_EMPLOYEE}/${id}`);
      return id; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial State
const initialState = {
  employees: [],
  isLoading: false,
  isError: false,
  isErrorMessage: "",
};

// Slice
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Employee
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isErrorMessage = "";
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        // Push employee only if payload is an object
        if (action.payload && typeof action.payload === 'object') {
          state.employees = [...state.employees, action.payload];
        }
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isErrorMessage = action.payload || "Failed to create employee";
      })

      // Get Employees
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isErrorMessage = "";
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isErrorMessage = action.payload || "Failed to fetch employees";
      })

      // Update Employee
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isErrorMessage = "";
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.employees.findIndex((emp) => emp._id === action.payload._id);
        if (index !== -1) {
          state.employees[index] = action.payload; // Update employee by _id
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isErrorMessage = action.payload || "Failed to update employee";
      })

      // Delete Employee
      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isErrorMessage = "";
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = state.employees.filter((emp) => emp._id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isErrorMessage = action.payload || "Failed to delete employee";
      });
  },
});

export default employeeSlice.reducer;
