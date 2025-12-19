import Cookies from 'js-cookie';
import { getToken } from './getToken';
import { store } from '../store';
import { setToken } from '../store/slices/requestsSlice';

export const syncTokenToCookie = () => {
  const token = getToken();
  if (token) {
    const hostname = window.location.hostname;
    Cookies.set('zoommentToken', token, {
      expires: 600,
      path: '/',
      secure: true,
      sameSite: 'lax',
      domain: `.${hostname}`
    });
    store.dispatch(setToken(token));
  }
};
