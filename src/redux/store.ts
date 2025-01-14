import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../slice/employee'
import authReducer from '../sliceApi/authSlice'
import warehouseReducer from '../sliceApi/warehouseSlice'
import attendanceReducer from '../sliceApi/attendanceSlice';


const store = configureStore({
  reducer: {
    employee: employeeReducer,
    auth: authReducer,
    warehouse: warehouseReducer,
    attendance: attendanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
