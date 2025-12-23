import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RequestError {
  message: string;
  code?: string;
  timestamp: number;
}

export interface RequestSuccess {
  message: string;
  timestamp: number;
}

interface RequestsState {
  token: string;
  error: RequestError | null;
  success: RequestSuccess | null;
}

const initialState: RequestsState = {
  token: '',
  error: null,
  success: null
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setError: (state, action: PayloadAction<{ message: string; code?: string }>) => {
      state.error = {
        message: action.payload.message,
        code: action.payload.code,
        timestamp: Date.now()
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    setSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.success = {
        message: action.payload.message,
        timestamp: Date.now()
      };
    },
    clearSuccess: (state) => {
      state.success = null;
    }
  }
});

export const { setToken, setError, clearError, setSuccess, clearSuccess } = requestsSlice.actions;
export default requestsSlice.reducer;
