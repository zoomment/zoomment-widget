import React, { useReducer, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 4px;
  position: relative;
  background: #e33725;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  padding: 5px 30px 5px 10px;
  & > span {
    position: absolute;
    right: 12px;
    top: 9px;
  }
`;

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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState('');
  const pageId = encodeURI(`${window.location.hostname}${window.location.pathname}`);

  const addComment = data => {
    return axios
      .post(`${props.api}/comments?pageId=${pageId}`, data)
      .then(response => dispatch({ type: 'ADD_COMMENT', payload: response.data }))
      .catch(response => Promise.reject(setError(response.message)));
  };

  const removeComment = data => {
    return axios
      .delete(`${props.api}/comments/${data._id}?secret=${data.secret}`)
      .then(() => dispatch({ type: 'REMOVE_COMMENT', payload: data }))
      .catch(response => Promise.reject(setError(response.message)));
  };

  const getComments = () => {
    return axios
      .get(`${props.api}/comments?pageId=${pageId}`)
      .then(response => dispatch({ type: 'GET_COMMENTS', payload: response.data }))
      .catch(response => Promise.reject(setError(response.message)));
  };

  return (
    <CommentsStateContext.Provider value={state}>
      <CommentsDispatchContext.Provider
        value={{ addComment, getComments, removeComment }}
      >
        {error && (
          <ErrorMessage>
            {error} :( <CloseOutlined onClick={() => setError('')} />
          </ErrorMessage>
        )}
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
