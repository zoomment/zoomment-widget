import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './slices/commentsSlice';
import reactionsReducer from './slices/reactionsSlice';
import visitorsReducer from './slices/visitorsSlice';
import requestsReducer from './slices/requestsSlice';
import votesReducer from './slices/votesSlice';
import { syncTokenToCookie } from '../utils/tokenManager';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    reactions: reactionsReducer,
    visitors: visitorsReducer,
    requests: requestsReducer,
    votes: votesReducer
  }
});

// Sync token to cookie after store creation
syncTokenToCookie();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
