import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { syncTokenToCookie } from '../utils/tokenManager';
import { getToken } from '../utils/getToken';

export const useTokenSync = () => {
  const reduxToken = useAppSelector((state) => state.requests.token);

  useEffect(() => {
    const currentToken = getToken();
    if (currentToken && currentToken !== reduxToken) {
      syncTokenToCookie();
    }
  }, [reduxToken]);
};
