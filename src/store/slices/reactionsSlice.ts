import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '../../utils/apiClient';

interface ReactionsState {
  loading: boolean;
  error: string | null;
  reactions: {
    aggregation: {
      _id: string;
      count: number;
    }[];
    userReaction: {
      reaction: string;
    };
  };
}

const initialState: ReactionsState = {
  loading: true,
  error: null,
  reactions: {
    aggregation: [],
    userReaction: {
      reaction: ''
    }
  }
};

export const getReactions = createAsyncThunk(
  'reactions/getReactions',
  async () => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;
    const data = await apiGet<ReactionsState['reactions']>(`/reactions?pageId=${encodeURI(pageId)}`);
    return data;
  }
);

export const react = createAsyncThunk(
  'reactions/react',
  async (reaction: string) => {
    const data = await apiPost<ReactionsState['reactions']>(`/reactions`, { reaction });
    return data;
  }
);

const reactionsSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReactions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reactions = action.payload;
      })
      .addCase(getReactions.rejected, (state) => {
        state.loading = false;
        // Error is handled globally by apiClient
      })
      .addCase(react.pending, (state) => {
        state.error = null;
      })
      .addCase(react.fulfilled, (state, action) => {
        state.error = null;
        state.reactions = action.payload;
      })
      .addCase(react.rejected, (state) => {
        // Error is handled globally by apiClient
      });
  }
});

export default reactionsSlice.reducer;
