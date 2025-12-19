import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet } from '../../utils/apiClient';

interface VisitorsState {
  loading: boolean;
  error: string | null;
  count: number;
}

const initialState: VisitorsState = {
  loading: true,
  error: null,
  count: 0
};

export const getVisitors = createAsyncThunk(
  'visitors/getVisitors',
  async () => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;
    const response = await apiGet<{ count?: number } | number>(`/visitors?pageId=${encodeURI(pageId)}`);
    const count = typeof response === 'number' ? response : response?.count || 0;
    return count;
  }
);

const visitorsSlice = createSlice({
  name: 'visitors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVisitors.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.count = action.payload;
      })
      .addCase(getVisitors.rejected, (state) => {
        state.loading = false;
        // Error is handled globally by apiClient
      });
  }
});

export default visitorsSlice.reducer;
