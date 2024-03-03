import React, { useReducer, useCallback } from 'react';
import { useRequest } from 'providers/Requests';

type Comment = {
  _id: string;
  secret: string;
  createdAt: Date;
  body: string;
  owner: {
    gravatar: string;
    email: string;
    name: string;
  };
};

type CommentsState = {
  loading: boolean;
  comments: Comment[];
};

type CommentsAction =
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'GET_COMMENTS'; payload: Comment[] }
  | { type: 'REMOVE_COMMENT'; payload: Partial<Comment> };

type CommentsDispatch = {
  addComment: (data: Partial<Comment>) => Promise<void>;
  removeComment: (data: Comment) => Promise<void>;
  getComments: () => Promise<void>;
};

const CommentsStateContext = React.createContext<CommentsState | undefined>(undefined);
const CommentsDispatchContext = React.createContext<CommentsDispatch | undefined>(
  undefined
);

const initialState = {
  loading: true,
  comments: []
};

const reducer = (state: CommentsState, action: CommentsAction) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    case 'GET_COMMENTS':
      return {
        ...state,
        loading: false,
        comments: action.payload
      };
    case 'REMOVE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(comment => comment._id !== action.payload._id)
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export default function CommentsProvider(props: Props) {
  const request = useRequest();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState
  });

  const addComment = useCallback(
    (data: Partial<Comment>) => {
      return request.post(`/comments`, { ...data }).then(response =>
        dispatch({
          type: 'ADD_COMMENT',
          payload: { ...data, ...response.data }
        })
      );
    },
    [request]
  );

  const removeComment = useCallback(
    (data: Partial<Comment>) => {
      return request
        .delete(`/comments/${data._id}?secret=${data.secret}`)
        .then(() => dispatch({ type: 'REMOVE_COMMENT', payload: data }));
    },
    [request]
  );

  const getComments = useCallback(() => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;

    return request.get(`/comments?pageId=${encodeURI(pageId)}`).then(response => {
      dispatch({ type: 'GET_COMMENTS', payload: response.data });
    });
  }, [request]);

  return (
    <CommentsStateContext.Provider value={state}>
      <CommentsDispatchContext.Provider
        value={{ addComment, getComments, removeComment }}
      >
        {props.children}
      </CommentsDispatchContext.Provider>
    </CommentsStateContext.Provider>
  );
}

export function useCommentsState() {
  const context = React.useContext(CommentsStateContext);
  if (context === undefined) {
    throw new Error('useCommentsState must be used within a CommentsProvider');
  }
  return context;
}

export function useCommentsDispatch() {
  const context = React.useContext(CommentsDispatchContext);
  if (context === undefined) {
    throw new Error('useCommentsDispatch must be used within a CommentsProvider');
  }
  return context;
}
