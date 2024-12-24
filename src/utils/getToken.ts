import { getCookie } from 'react-use-cookie';

export const getToken = () => {
  const searchParams = new URL(window.location.href).searchParams;
  const zoommentToken = searchParams.get('zoommentToken');
  const token = zoommentToken || getCookie('zoommentToken');

  return token;
};
