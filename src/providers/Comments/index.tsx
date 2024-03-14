import React, { useReducer, useCallback } from 'react';
import { useRequest } from 'providers/Requests';

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

type CommentsState = {
  loading: boolean;
  comments: IComment[];
  replayTo?: IComment;
};

type CommentsAction =
  | { type: 'REPLY_COMMENT'; payload?: IComment }
  | { type: 'ADD_COMMENT'; payload: IComment }
  | { type: 'GET_COMMENTS'; payload: IComment[] }
  | { type: 'REMOVE_COMMENT'; payload: Partial<IComment> };

type CommentsDispatch = {
  addComment: (data: Partial<IComment>) => Promise<void>;
  removeComment: (data: IComment) => Promise<void>;
  getComments: () => Promise<void>;
  replay: (comment?: IComment) => void;
};

const CommentsStateContext = React.createContext<CommentsState | undefined>(undefined);
const CommentsDispatchContext = React.createContext<CommentsDispatch | undefined>(
  undefined
);

const initialState: CommentsState = {
  loading: true,
  comments: [],
  replayTo: undefined
};

const reducer = (state: CommentsState, action: CommentsAction) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      if (!action.payload.parentId) {
        return {
          ...state,
          comments: [...state.comments, action.payload]
        };
      }
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment._id !== action.payload.parentId) return comment;

          return {
            ...comment,
            replies: [...comment.replies, action.payload]
          };
        })
      };
    case 'GET_COMMENTS':
      return {
        ...state,
        loading: false,
        comments: action.payload
      };
    case 'REMOVE_COMMENT':
      if (!action.payload.parentId) {
        return {
          ...state,
          comments: state.comments.filter(comment => comment._id !== action.payload._id)
        };
      }
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment._id !== action.payload.parentId) return comment;

          return {
            ...comment,
            replies: comment.replies.filter(reply => reply._id !== action.payload._id)
          };
        })
      };
    case 'REPLY_COMMENT':
      return {
        ...state,
        replayTo: action.payload
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export default function CommentsProvider(props: Props) {
  const { instance } = useRequest();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState
  });

  const addComment = useCallback(
    (data: Partial<IComment>) => {
      return instance.post(`/comments`, { ...data }).then(response =>
        dispatch({
          type: 'ADD_COMMENT',
          payload: { ...data, ...response.data }
        })
      );
    },
    [instance]
  );

  const removeComment = useCallback(
    (data: Partial<IComment>) => {
      return instance
        .delete(`/comments/${data._id}?secret=${data.secret}`)
        .then(() => dispatch({ type: 'REMOVE_COMMENT', payload: data }));
    },
    [instance]
  );

  const getComments = useCallback(() => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;

    return instance.get(`/comments?pageId=${encodeURI(pageId)}`).then(response => {
      dispatch({ type: 'GET_COMMENTS', payload: response.data });
    });
  }, [instance]);

  const replay = useCallback((comment?: IComment) => {
    dispatch({ type: 'REPLY_COMMENT', payload: comment });
  }, []);

  return (
    <CommentsStateContext.Provider value={state}>
      <CommentsDispatchContext.Provider
        value={{ addComment, getComments, removeComment, replay }}
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
