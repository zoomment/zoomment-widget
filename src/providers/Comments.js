import React, { useReducer } from 'react';
import axios from 'axios';

const CommentsStateContext = React.createContext(undefined);
const CommentsDispatchContext = React.createContext(undefined);

const initialState = {
  loading: false,
  comments: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case 'GET_COMMENTS':
      return {
        ...state,
        comments: action.payload,
      };
    case 'REMOVE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export default function CommentsProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pageId = encodeURI(`${window.location.hostname}${window.location.pathname}`);

  const addComment = (data) => {
    return axios
      .post(`${props.api}/comments?pageId=${pageId}`, data)
      .then((response) => dispatch({ type: 'ADD_COMMENT', payload: response.data }));
  };

  const removeComment = (data) => {
    return axios
      .delete(`${props.api}/comments/${data._id}?secret=${data.secret}`)
      .then(() => dispatch({ type: 'REMOVE_COMMENT', payload: data }));
  };

  const getComments = () => {
    return axios
      .get(`${props.api}/comments?pageId=${pageId}`)
      .then((response) => dispatch({ type: 'GET_COMMENTS', payload: response.data }));
  };

  return (
    <CommentsStateContext.Provider value={state}>
      <CommentsDispatchContext.Provider value={{ addComment, getComments, removeComment }}>
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
