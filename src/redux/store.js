import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../slice/employee'

const store = configureStore({
  reducer: {
employee:employeeReducer
  },
});

export default store;
