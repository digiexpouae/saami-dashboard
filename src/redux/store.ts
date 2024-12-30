import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../slice/employee'
import authReducer from '../sliceApi/authSlice'
import warehouseReducer from '../sliceApi/warehouseSlice'

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    auth: authReducer,
    warehouse: warehouseReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
