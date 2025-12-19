import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiDelete } from '../../utils/apiClient';

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
  owner: {
    gravatar?: string;
    email: string;
    name: string;
  };
};

interface CommentsState {
  loading: boolean;
  addingComment: boolean;
  error: string | null;
  comments: IComment[];
  replayTo?: IComment;
}

const initialState: CommentsState = {
  loading: true,
  addingComment: false,
  error: null,
  comments: [],
  replayTo: undefined
};

export const getComments = createAsyncThunk(
  'comments/getComments',
  async () => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;
    const data = await apiGet<any>(`/comments?pageId=${encodeURI(pageId)}`);
    
    // Ensure we always return an array
    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === 'object') {
      if (Array.isArray(data.comments)) {
        return data.comments;
      } else if (Array.isArray(data.data)) {
        return data.data;
      }
    }
    
    // Fallback to empty array if format is unexpected
    return [];
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
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Ensure payload is always an array
        const payload = action.payload as any;
        if (Array.isArray(payload)) {
          state.comments = payload;
        } else if (payload && typeof payload === 'object') {
          // Handle different response formats
          if (Array.isArray(payload.comments)) {
            state.comments = payload.comments;
          } else if (Array.isArray(payload.data)) {
            state.comments = payload.data;
          } else {
            state.comments = [];
          }
        } else {
          state.comments = [];
        }
      })
      .addCase(getComments.rejected, (state) => {
        state.loading = false;
        // Ensure comments remains an array on error
        if (!Array.isArray(state.comments)) {
          state.comments = [];
        }
        // Error is handled globally by apiClient
      })
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
        } else {
          const parentComment = state.comments.find(c => c._id === comment.parentId);
          if (parentComment) {
            // Ensure replies array exists
            if (!parentComment.replies) {
              parentComment.replies = [];
            }
            parentComment.replies.push(comment);
          }
        }
      })
      .addCase(addComment.rejected, (state) => {
        state.addingComment = false;
        // Error is handled globally by apiClient
      })
      .addCase(removeComment.pending, (state) => {
        state.error = null;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.error = null;
        const comment = action.payload;
        if (!comment.parentId) {
          state.comments = state.comments.filter(c => c._id !== comment._id);
        } else {
          const parentComment = state.comments.find(c => c._id === comment.parentId);
          if (parentComment && parentComment.replies) {
            parentComment.replies = parentComment.replies.filter(r => r._id !== comment._id);
          }
        }
      })
      .addCase(removeComment.rejected, (state) => {
        // Error is handled globally by apiClient
      });
  }
});

export const { replay } = commentsSlice.actions;
export default commentsSlice.reducer;
