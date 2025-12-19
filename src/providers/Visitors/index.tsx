import React, { useReducer, useCallback } from 'react';
import { useRequest } from 'providers/Requests';

type State = {
  loading: boolean;
  count: number;
};

type VisitorsDispatch = {
  getVisitors: () => void;
};

type Action = { type: 'GET_VISITORS'; payload: number };

const VisitorsStateContext = React.createContext<State | undefined>(undefined);
const VisitorsDispatchContext = React.createContext<VisitorsDispatch | undefined>(
  undefined
);

const initialState: State = {
  loading: true,
  count: 0
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GET_VISITORS':
      return {
        ...state,
        loading: false,
        count: action.payload
      };
    default:
      return state;
  }
};

export function useVisitorsState() {
  const context = React.useContext(VisitorsStateContext);
  if (context === undefined) {
    throw new Error('useVisitorsState must be used within a VisitorsProvider');
  }
  return context;
}

export function useVisitorsDispatch() {
  const context = React.useContext(VisitorsDispatchContext);
  if (context === undefined) {
    throw new Error('useVisitorsDispatch must be used within a VisitorsProvider');
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

export default function VisitorsProvider(props: Props) {
  const { instance } = useRequest();

  const [state, dispatch] = useReducer(reducer, {
    ...initialState
  });

  const getVisitors = useCallback(() => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;

    return instance
      .get(`/visitors?pageId=${encodeURI(pageId)}`)
      .then(response => {
        const count = response.data?.count || response.data || 0;
        dispatch({ type: 'GET_VISITORS', payload: count });
      })
  }, [instance]);

  return (
    <VisitorsStateContext.Provider value={state}>
      <VisitorsDispatchContext.Provider value={{ getVisitors }}>
        {props.children}
      </VisitorsDispatchContext.Provider>
    </VisitorsStateContext.Provider>
  );
}

