import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../slice/employeeSlice'


const store = configureStore({
  reducer: {
    counter:appReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
