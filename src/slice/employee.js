import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {CREATE_EMPLOYEE,api,GET_ALL_EMPLOYEE,} from '../config/axios';
import { data } from "autoprefixer";


export const  createemployee=createAsyncThunk('employee-data',async(payload)=>{

try{
  const server=await api.post(CREATE_EMPLOYEE,payload)
  
    return server.data
}
catch(error){
throw new Error("failed to send data"+error.message)
}
})


export const  getemployee=createAsyncThunk('employee-get',async(payload)=>{

  try{
    const server=await api.get(GET_ALL_EMPLOYEE,payload)
    
      return server.data
  }
});

export const getemployee = createAsyncThunk('employee/get', async (payload) => {
  try {
    const server = await api.post(GET_ALL_EMPLOYEE, payload);
    return server.data;
  } catch (error) {
    throw new Error("Failed to fetch data: " + error.message);
  }
  })
  export const  updateemployee=createAsyncThunk('employee-update',async(payload)=>{

    try{
      const server=await api.put(UPDATE_EMPLOYEE,payload)
      
        return server.data
    }
    catch(error){
    throw new Error("failed to send data"+error.message)
    }
    })
    export const deleteemployee=createAsyncThunk('employee-delete',async(payload)=>{

      try{
        const server=await api.delete(DELETE_EMPLOYEE,payload)
        
          return server.data
      }
      catch(error){
      throw new Error("failed to send data"+error.message)
      }
      })
    
      const initialState = {
        data: [],
        isLoading: false,
        isError: false,
        isErrorMessage: "",
      };
      
      const slice = createSlice({
        name: "employee",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            // Create Employee
            .addCase(createemployee.fulfilled, (state, action) => {
              state.isLoading = false;
              state.data.push(action.payload);
            })
            .addCase(createemployee.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isErrorMessage = action.error.message;
            })
            .addCase(createemployee.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
              state.isErrorMessage = "";
            })
            // Get Employees
            .addCase(getemployee.fulfilled, (state,) => {
              state.isLoading = false;
              state.data = data; // Replace data
            })
            .addCase(getemployee.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
              // state.isErrorMessage = action.error.message;
            })
            .addCase(getemployee.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
              state.isErrorMessage = "";
            })
            // Update Employee
            .addCase(updateemployee.fulfilled, (state, action) => {
              state.isLoading = false;
              const index = state.data.findIndex((emp) => emp.id === action.payload.id);
              if (index !== -1) {
                state.data[index] = action.payload; // Update specific employee
              }
            })
            .addCase(updateemployee.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isErrorMessage = action.error.message;
            })
            .addCase(updateemployee.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
              state.isErrorMessage = "";
            })
            // Delete Employee
            .addCase(deleteemployee.fulfilled, (state, action) => {
              state.isLoading = false;
              state.data = state.data.filter((emp) => emp.id !== action.payload); // Remove employee
            })
            .addCase(deleteemployee.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isErrorMessage = action.error.message;
            })
            .addCase(deleteemployee.pending, (state) => {
              state.isLoading = true;
              state.isError = false;
              state.isErrorMessage = "";
            });
        },
      });
      
      export default slice.reducer;
      
