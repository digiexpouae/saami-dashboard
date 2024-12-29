import api from '@config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';

const ApiWrapper = <
  ReturnType = any,
  ArgType = void,
  RejectedValueType = string,
>(
  type: string,
  apiConfig: (data: ArgType) => AxiosRequestConfig,
) => {
  
  return createAsyncThunk<
    ReturnType,
    ArgType,
    { rejectValue: RejectedValueType }
  >(type, async (args: ArgType, { rejectWithValue }) => {
    try {
      const config = apiConfig(args);
      const response = await api.request(config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  });
};

export default ApiWrapper;
