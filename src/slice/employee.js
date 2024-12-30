import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CREATE_EMPLOYEE ,api} from "../config/axios";

export const  createemployee=createAsyncThunk('employee-data',async(payload)=>{

try{
  const server=await axios.post(CREATE_EMPLOYEE,payload)
  
    return server.data
}
catch(error){
throw new Error("failed to send data"+error.message)
}
})


export const  getemployee=createAsyncThunk('employee-data',async(payload)=>{

  try{
    const server=await api.post(GET_ALL_EMPLOYEE,payload)
    
      return server.data
  }
  catch(error){
  throw new Error("failed to send data"+error.message)
  }
  })
  export const  updateemployee=createAsyncThunk('employee-data',async(payload)=>{

    try{
      const server=await api.post(UPDATE_EMPLOYEE,payload)
      
        return server.data
    }
    catch(error){
    throw new Error("failed to send data"+error.message)
    }
    })
    export const deleteemployee=createAsyncThunk('employee-data',async(payload)=>{

      try{
        const server=await api.post(DELETE_EMPLOYEE,payload)
        
          return server.data
      }
      catch(error){
      throw new Error("failed to send data"+error.message)
      }
      })
    
const initialState={
    data:[]
}
const slice=createSlice({
name:'employee',initialState,reducers:{},extraReducers:(builder)=>{
builder.addCase(createemployee.fulfilled,(state,action)=>{
    state.data.push(action.payload)});
    builder.addCase(employee.rejected, (state, action) => {
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