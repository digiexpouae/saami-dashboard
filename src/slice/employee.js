import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../config/axios'
export const  create_employee=createAsyncThunk('employee-data',async(payload)=>{

try{
  const server=await api.post(CREATE_EMPLOYEE,payload)
  
    return server.data
}
catch(error){
throw new Error("failed to send data"+error.message)
}
})
export const  get_all_employee=createAsyncThunk('employee-data',async(payload)=>{

  try{
    const server=await api.post(GELL_ALL_EMPLOYEE,payload)
    
      return server.data
  }
  catch(error){
  throw new Error("failed to send data"+error.message)
  }
  })
  export const  update_employee=createAsyncThunk('employee-data',async(payload)=>{

    try{
      const server=await api.post(UPDATE_EMPLOYEE,payload)
      
        return server.data
    }
    catch(error){
    throw new Error("failed to send data"+error.message)
    }
    })
    export const  delete_employee=createAsyncThunk('employee-data',async(payload)=>{

      try{
        const server=await api.post(DELETE_EMPLOYEE,payload)
        
          return server.data
      }
      catch(error){
      throw new Error("failed to send data"+error.message)
      }
      })
const initialState={
  isLoading:false,
  isError:false,
 isrrorMessage:"",
    data:[]
}
const slice=createSlice({
name:employee,initialState,reducers:{},extraReducers:(builder)=>{
builder
.addCase(create_employee.fulfilled,(state,action)=>{
  state.isLoading=false;
    state.data.push(action.payload)})
.addCase(create_employee.rejected, (state, action) => {
        // Optionally handle the error case
        console.error('Failed to add employee data:', action.error);
      })
.addCase(create_employee.pending,(state,action)=>{
state.isLoading =true;
state.isError=false;
state.iserrorMessage="";
      })
      .addCase( get_all_employee.fulfilled,(state,action)=>{
        state.isLoading=false;
          state.data.push(action.payload)})

      .addCase( get_all_employee.rejected, (state, action) => {
        // Optionally handle the error case
        console.error('Failed to add employee data:', action.error);
      })
.addCase( get_all_employee.pending,(state,action)=>{
state.isLoading =true;
state.isError=false;
state.iserrorMessage="";
      })

      .addCase(update_employee.fulfilled,(state,action)=>{
        state.isLoading=false;
          state.data.push(action.payload)})

      .addCase(update_employee.rejected, (state, action) => {
        // Optionally handle the error case
        console.error('Failed to add employee data:', action.error);
      })
.addCase(update_employee.pending,(state,action)=>{
state.isLoading =true;
state.isError=false;
state.iserrorMessage="";
      })

      
      .addCase(delete_employee.fulfilled,(state,action)=>{
        state.isLoading=false;
          state.data.push(action.payload)})

      .addCase(delete_employee.rejected, (state, action) => {
        // Optionally handle the error case
        console.error('Failed to add employee data:', action.error);
      })
.addCase(delete_employee.pending,(state,action)=>{
state.isLoading =true;
state.isError=false;
state.iserrorMessage="";
      })



}    
})
export default slice.reducer;