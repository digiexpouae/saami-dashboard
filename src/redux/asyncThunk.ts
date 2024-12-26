import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@config/axios'; // Your Axios instance or API setup

interface AsyncThunkConfig {
  method?: 'get' | 'post' | 'put' | 'delete';
  url: string;
  data?: any; // For payload in POST/PUT
  params?: any; // For query parameters in GET
}

export const createApiThunk = <Returned, ThunkArg = void>(
  typePrefix: string,
  apiConfig: (arg: ThunkArg) => AsyncThunkConfig,
) => {
  return createAsyncThunk<Returned, ThunkArg>(
    typePrefix,
    async (arg, { rejectWithValue }) => {
      try {
        const { method = 'get', url, data, params } = apiConfig(arg);
        const response = await api.request({
          method,
          url,
          data,
          params,
        });
        return response.data as Returned;
      } catch (error: any) {
        // Customize error handling as needed
        return rejectWithValue(error.response?.data || error.message);
      }
    },
  );
};
