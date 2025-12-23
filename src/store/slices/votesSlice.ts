import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '../../utils/apiClient';

export interface VoteData {
  upvotes: number;
  downvotes: number;
  score: number;
  userVote: -1 | 0 | 1;
}

interface VotesState {
  votes: Record<string, VoteData>;
  loading: boolean;
  votingCommentId: string | null;
}

const initialState: VotesState = {
  votes: {},
  loading: false,
  votingCommentId: null
};

// Fetch votes for multiple comments
export const getVotes = createAsyncThunk(
  'votes/getVotes',
  async (commentIds: string[]) => {
    if (commentIds.length === 0) return {};
    const data = await apiGet<Record<string, VoteData>>(
      `/votes?commentIds=${commentIds.join(',')}`
    );
    return data;
  }
);

// Vote on a comment
export const vote = createAsyncThunk(
  'votes/vote',
  async ({ commentId, value }: { commentId: string; value: 1 | -1 }) => {
    const data = await apiPost<VoteData & { commentId: string }>('/votes', {
      commentId,
      value
    });
    return data;
  }
);

const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get votes for multiple comments
      .addCase(getVotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVotes.fulfilled, (state, action) => {
        state.loading = false;
        state.votes = { ...state.votes, ...action.payload };
      })
      .addCase(getVotes.rejected, (state) => {
        state.loading = false;
      })
      // Vote on a comment
      .addCase(vote.pending, (state, action) => {
        state.votingCommentId = action.meta.arg.commentId;
      })
      .addCase(vote.fulfilled, (state, action) => {
        state.votingCommentId = null;
        const { commentId, upvotes, downvotes, score, userVote } = action.payload;
        state.votes[commentId] = { upvotes, downvotes, score, userVote };
      })
      .addCase(vote.rejected, (state) => {
        state.votingCommentId = null;
      });
  }
});

export default votesSlice.reducer;

