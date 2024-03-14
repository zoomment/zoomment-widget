import React, { useState, useMemo, useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import { ClientJS } from 'clientjs';
import { ErrorMessage, Close } from '../Comments/style';
import { FadeIn } from './style';

const RequestContext = React.createContext<
  | {
      instance: AxiosInstance;
      token: string;
    }
  | undefined
>(undefined);

export function useRequest() {
  const context = React.useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequest must be used within a RequestProvider');
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

export default function RequestProvider(props: Props) {
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const instance = useMemo(() => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;
    const client = new ClientJS();
    const fingerprint = client.getFingerprint();

    return axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        fingerprint
      },
      transformRequest: [
        function (data) {
          return {
            ...data,
            pageId
          };
        },
        ...axios.defaults.transformRequest
      ],
      transformResponse: [
        function (data, _headers, status) {
          if (status !== 200) {
            setError(data || 'Something went wrong!');
          }
          return data;
        },
        ...axios.defaults.transformResponse
      ]
    });
  }, [axios]);

  useEffect(() => {
    const messageListener = (e: any) => {
      if (!e.data || e.data.sender !== 'zoomment' || !e.data.token) {
        return;
      }

      instance.defaults.headers['token'] = e.data.token;
      setToken(e.data.token);
    };

    window.addEventListener('message', messageListener, false);

    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);

  return (
    <RequestContext.Provider value={{ instance, token }}>
      {error && (
        <ErrorMessage>
          {error} <Close onClick={() => setError('')} />
        </ErrorMessage>
      )}
      <iframe src="https://zoomment.com/token" style={{ display: 'none' }} />
      <FadeIn>{props.children}</FadeIn>
    </RequestContext.Provider>
  );
}
