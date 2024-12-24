import React, { useState, useMemo, useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import { ClientJS } from 'clientjs';
import Cookies from 'js-cookie';
import { ErrorMessage, Close } from '../Comments/style';
import { getToken } from 'utils/getToken';
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

  const token = getToken();

  useEffect(() => {
    const hostname = window.location.hostname;
    if (token) {
      Cookies.set('zoommentToken', token, {
        expires: 600,
        path: '/',
        secure: true,
        sameSite: 'lax',
        domain: `.${hostname}`
      });
    }
  }, [token]);

  const instance = useMemo(() => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;
    const client = new ClientJS();
    const fingerprint = client.getFingerprint();

    return axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        fingerprint,
        token
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

  return (
    <RequestContext.Provider value={{ instance, token }}>
      {error && (
        <ErrorMessage>
          {error} <Close onClick={() => setError('')} />
        </ErrorMessage>
      )}
      <FadeIn>{props.children}</FadeIn>
    </RequestContext.Provider>
  );
}
