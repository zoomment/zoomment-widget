import React, { useReducer, useCallback } from 'react';
import { useRequest } from 'providers/Requests';

const ReactionStateContext = React.createContext(undefined);
const ReactionDispatchContext = React.createContext(undefined);

const initialState = {
  loading: true,
  reactions: []
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
  const request = useRequest();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...props
  });

  const react = useCallback(
    reaction => {
      return request.post(`/reactions`, { reaction }).then(response =>
        dispatch({
          type: 'REACT',
          payload: response.data
        })
      );
    },
    [request]
  );

  const getReactions = useCallback(() => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;

    return request
      .get(`/reactions?pageId=${encodeURI(pageId)}`)
      .then(response => dispatch({ type: 'GET_REACTIONS', payload: response.data }));
  }, [request]);

  return (
    <ReactionStateContext.Provider value={state}>
      <ReactionDispatchContext.Provider value={{ react, getReactions }}>
        {props.children}
      </ReactionDispatchContext.Provider>
    </ReactionStateContext.Provider>
  );
}
