import React, { useReducer, useState } from 'react';
import axios from 'axios';
import { ErrorMessage, Close } from '../Comments/style';

const ReactionStateContext = React.createContext(undefined);
const ReactionDispatchContext = React.createContext(undefined);

const initialState = {
  loading: true,
  reactions: [],
  api: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'REACT':
      return {
        ...state,
        reactions: action.payload
      };
    case 'GET_REACTIONS':
      return {
        ...state,
        loading: false,
        reactions: action.payload
      };
    default:
      return state;
  }
};

export function useReactionState() {
  const context = React.useContext(ReactionStateContext);
  if (context === undefined) {
    throw new Error('useReactionState must be used within a ReactionProvider');
  }
  return context;
}

export function useReactionDispatch() {
  const context = React.useContext(ReactionDispatchContext);
  if (context === undefined) {
    throw new Error('useReactionDispatch must be used within a ReactionProvider');
  }
  return context;
}

export default function ReactionProvider(props) {
  const [error, setError] = useState('');

  const pageId = `${window.location.hostname}${window.location.pathname}`;
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...props
  });

  const react = reaction => {
    return axios
      .post(`${props.api}/reactions`, { reaction, pageId })
      .then(response =>
        dispatch({
          type: 'REACT',
          payload: response.data
        })
      )
      .catch(response => Promise.reject(setError(response.message)));
  };

  const getReactions = () => {
    return axios
      .get(`${props.api}/reactions?pageId=${encodeURI(pageId)}`)
      .then(response => dispatch({ type: 'GET_REACTIONS', payload: response.data }))
      .catch(response => Promise.reject(setError(response.message)));
  };

  return (
    <ReactionStateContext.Provider value={state}>
      <ReactionDispatchContext.Provider value={{ react, getReactions }}>
        {error && (
          <ErrorMessage>
            {error} :( <Close onClick={() => setError('')} />
          </ErrorMessage>
        )}
        {props.children}
      </ReactionDispatchContext.Provider>
    </ReactionStateContext.Provider>
  );
}
