import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { ErrorMessage, Close } from '../Comments/style';
import { Preloader } from './style';
import { useTranslation } from 'react-i18next';

const RequestContext = React.createContext(undefined);

export function useRequest() {
  const context = React.useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequest must be used within a RequestProvider');
  }
  return context;
}

export default function RequestProvider(props) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const instance = useMemo(() => {
    const pageId = `${window.location.hostname}${window.location.pathname}`;

    return axios.create({
      baseURL: props.apiUrl,
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
  }, [axios, props.baseURL]);

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
