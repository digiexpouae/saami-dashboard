import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@config/axios';
import { GET_ALL_WAREHOUSE, CREATE_WAREHOUSE, UPDATE_WAREHOUSE, DELETE_WAREHOUSE } from '@config/axios';

interface Warehouse {
  id: string;
  name: string;
}

interface WarehouseState {
  warehouses: Warehouse[];
  loading: boolean;
  error: string | null;
}

const initialState: WarehouseState = {
  warehouses: [],
  loading: false,
  error: null,
};

// Async thunk for fetching warehouses
export const fetchWarehouses = createAsyncThunk(
  'warehouse/fetchWarehouses',
  async (_, thunkAPI) => {
    try {
      const response = await api.get(GET_ALL_WAREHOUSE);
      // console.log(response);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Failed to fetch warehouses',
      );
    }
  },
);

// Async thunk for creating a warehouse
export const createWarehouse = createAsyncThunk(
  'warehouse/createWarehouse',
  async ({ payload, token }: { payload: any; token: string }, thunkAPI) => {
    try {
      const response = await api.post(CREATE_WAREHOUSE, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Failed to create warehouse',
      );
    }
  },
);

// Async thunk for updating a warehouse
export const updateWarehouse = createAsyncThunk(
  'warehouse/updateWarehouse',
  async (
    { updatedWarehouse, token }: { updatedWarehouse: Warehouse; token: string },
    thunkAPI,
  ) => {
    try {
      const response = await api.put(
        `${UPDATE_WAREHOUSE}/${updatedWarehouse.id}`,
        updatedWarehouse,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Failed to update warehouse',
      );
    }
  },
);

// Async thunk for deleting a warehouse
export const deleteWarehouse = createAsyncThunk(
  'warehouse/deleteWarehouse',
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    try {
      await api.delete(`${DELETE_WAREHOUSE}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Failed to delete warehouse',
      );
    }
  },
);

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarehouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouses = action.payload;
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createWarehouse.fulfilled, (state, action) => {
        state.warehouses.push(action.payload);
      })
      .addCase(updateWarehouse.fulfilled, (state, action) => {
        const index = state.warehouses.findIndex(
          (wh) => wh.id === action.payload.id,
        );
        if (index !== -1) {
          state.warehouses[index] = action.payload;
        }
      })
      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.warehouses = state.warehouses.filter(
          (wh) => wh.id !== action.payload,
        );
      });
  },
});

export default warehouseSlice.reducer;
