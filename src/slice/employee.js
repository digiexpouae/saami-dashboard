import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const  employee=createAsyncThunk('employee-data',async(payload)=>{

try{
  const server=await axios.post('http://localhost:5173/employee',payload)
  
    return server.data
}
catch(error){
throw new Error("failed to send data"+error.message)
}
})
const initialState={
    data:['']
}
const slice=
createSlice({
name:employee,initialState,reducers:{},extraReducers:(builder)=>{
builder.addCase(employee.fulfilled,(state,action)=>{
    state.data.push(action.payload)
    builder.addCase(employee.rejected, (state, action) => {
        // Optionally handle the error case
        console.error('Failed to add employee data:', action.error);
      });
})

}    
})
export default slice.reducer;