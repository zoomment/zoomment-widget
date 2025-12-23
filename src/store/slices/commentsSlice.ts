import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiDelete } from '../../utils/apiClient';

const COMMENTS_LIMIT = 5;
const REPLIES_LIMIT = 5;

export type IComment = {
  _id: string;
  secret: string;
  createdAt: Date;
  isOwn: boolean;
  isVerified: boolean;
  body: string;
  email: string;
  author: string;
  gravatar: string;
  pageUrl: string;
  parentId?: string;
  // owner field deprecated
  replies: IComment[];
  repliesCount?: number;
  repliesLoaded?: boolean;
  repliesHasMore?: boolean;
  repliesSkip?: number;
  loadingReplies?: boolean;
  owner: {
    gravatar?: string;
    email: string;
    name: string;
  };
};

interface CommentsResponse {
  comments: IComment[];
  total: number;
  limit: number;
  skip: number;
  hasMore: boolean;
}

interface RepliesResponse {
  replies: IComment[];
  total: number;
  limit: number;
  skip: number;
  hasMore: boolean;
}

interface CommentsState {
  loading: boolean;
  loadingMore: boolean;
  addingComment: boolean;
  error: string | null;
  comments: IComment[];
  total: number;
  skip: number;
  hasMore: boolean;
  replayTo?: IComment;
}

const initialState: CommentsState = {
  loading: true,
  loadingMore: false,
  addingComment: false,
  error: null,
  comments: [],
  total: 0,
  skip: 0,
  hasMore: false,
  replayTo: undefined
};

export const getComments = createAsyncThunk(
  'comments/getComments',
  async () => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;
    const data = await apiGet<CommentsResponse>(
      `/comments?pageId=${encodeURIComponent(pageId)}&limit=${COMMENTS_LIMIT}&skip=0`
    );
    return data;
  }
);

export const getMoreComments = createAsyncThunk(
  'comments/getMoreComments',
  async (skip: number) => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;
    const data = await apiGet<CommentsResponse>(
      `/comments?pageId=${encodeURIComponent(pageId)}&limit=${COMMENTS_LIMIT}&skip=${skip}`
    );
    return data;
  }
);

export const getReplies = createAsyncThunk(
  'comments/getReplies',
  async ({ commentId, skip = 0 }: { commentId: string; skip?: number }) => {
    const data = await apiGet<RepliesResponse>(
      `/comments/${commentId}/replies?limit=${REPLIES_LIMIT}&skip=${skip}`
    );
    return { commentId, ...data };
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Partial<IComment>) => {
    const response = await apiPost<IComment>(`/comments`, { ...data });
    // Merge response data, but prioritize response data over input data
    return { ...data, ...response } as IComment;
  }
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (data: Partial<IComment>) => {
    const queryParam = data.secret ? `?secret=${data.secret}` : ``;
    await apiDelete(`/comments/${data._id}${queryParam}`);
    return data;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    replay: (state, action: PayloadAction<IComment | undefined>) => {
      state.replayTo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get initial comments
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { comments, total, skip, hasMore } = action.payload;
        state.comments = comments || [];
        state.total = total;
        state.skip = skip + (comments?.length || 0);
        state.hasMore = hasMore;
      })
      .addCase(getComments.rejected, (state) => {
        state.loading = false;
        if (!Array.isArray(state.comments)) {
          state.comments = [];
        }
      })
      // Load more comments
      .addCase(getMoreComments.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(getMoreComments.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.error = null;
        const { comments, hasMore } = action.payload;
        state.comments = [...state.comments, ...(comments || [])];
        state.skip = state.skip + (comments?.length || 0);
        state.hasMore = hasMore;
      })
      .addCase(getMoreComments.rejected, (state) => {
        state.loadingMore = false;
      })
      // Get replies for a comment
      .addCase(getReplies.pending, (state, action) => {
        const commentId = action.meta.arg.commentId;
        const comment = state.comments.find(c => c._id === commentId);
        if (comment) {
          comment.loadingReplies = true;
        }
      })
      .addCase(getReplies.fulfilled, (state, action) => {
        const { commentId, replies, hasMore, skip } = action.payload;
        const comment = state.comments.find(c => c._id === commentId);
        if (comment) {
          comment.loadingReplies = false;
          comment.repliesLoaded = true;
          comment.repliesHasMore = hasMore;
          comment.repliesSkip = skip + (replies?.length || 0);
          if (skip === 0) {
            comment.replies = replies || [];
          } else {
            comment.replies = [...(comment.replies || []), ...(replies || [])];
          }
        }
      })
      .addCase(getReplies.rejected, (state, action) => {
        const commentId = action.meta.arg.commentId;
        const comment = state.comments.find(c => c._id === commentId);
        if (comment) {
          comment.loadingReplies = false;
        }
      })
      // Add comment
      .addCase(addComment.pending, (state) => {
        state.addingComment = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addingComment = false;
        state.error = null;
        const comment = action.payload as IComment;
        if (!comment.parentId) {
          state.comments.push(comment);
          state.total += 1;
        } else {
          const parentComment = state.comments.find(c => c._id === comment.parentId);
          if (parentComment) {
            if (!parentComment.replies) {
              parentComment.replies = [];
            }
            parentComment.replies.push(comment);
            if (parentComment.repliesCount !== undefined) {
              parentComment.repliesCount += 1;
            }
          }
        }
      })
      .addCase(addComment.rejected, (state) => {
        state.addingComment = false;
      })
      // Remove comment
      .addCase(removeComment.pending, (state) => {
        state.error = null;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.error = null;
        const comment = action.payload;
        if (!comment.parentId) {
          state.comments = state.comments.filter(c => c._id !== comment._id);
          state.total -= 1;
        } else {
          const parentComment = state.comments.find(c => c._id === comment.parentId);
          if (parentComment && parentComment.replies) {
            parentComment.replies = parentComment.replies.filter(r => r._id !== comment._id);
            if (parentComment.repliesCount !== undefined && parentComment.repliesCount > 0) {
              parentComment.repliesCount -= 1;
            }
          }
        }
      })
      .addCase(removeComment.rejected, () => {
        // Error is handled globally by apiClient
      });
  }
});

export const { replay } = commentsSlice.actions;
export default commentsSlice.reducer;
