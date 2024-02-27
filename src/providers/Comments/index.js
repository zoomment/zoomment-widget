import React, { useReducer, useCallback } from 'react';
import { useRequest } from 'providers/Requests';

const CommentsStateContext = React.createContext(undefined);
const CommentsDispatchContext = React.createContext(undefined);

const initialState = {
  loading: true,
  comments: []
};

const reducer = (state, action) => {
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

export default function CommentsProvider(props) {
  const request = useRequest();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...props
  });

  const addComment = useCallback(
    data => {
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
    data => {
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
