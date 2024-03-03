import React, { useState, useMemo, useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { ErrorMessage, Close } from '../Comments/style';
import { Preloader } from './style';

const RequestContext = React.createContext<AxiosInstance | undefined>(undefined);

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
  const [loading, setLoading] = useState(true);

  const instance = useMemo(() => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;

    return axios.create({
      baseURL: process.env.REACT_APP_API_URL,
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
    if (instance) {
      setLoading(true);
      FingerprintJS.load().then(fp => {
        fp.get().then(({ visitorId }) => {
          instance.defaults.headers['fingerprint'] = visitorId;
          setLoading(false);
        });
      });
    }
  }, [instance]);

  return (
    <RequestContext.Provider value={instance}>
      {error && (
        <ErrorMessage>
          {error} <Close onClick={() => setError('')} />
        </ErrorMessage>
      )}
      {loading ? <Preloader /> : props.children}
    </RequestContext.Provider>
  );
}
