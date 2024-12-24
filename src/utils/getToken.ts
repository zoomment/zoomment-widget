import Cookies from 'js-cookie';

export const getToken = () => {
  const searchParams = new URL(window.location.href).searchParams;
  const zoommentToken = searchParams.get('zoommentToken');
  const token = zoommentToken || Cookies.get('zoommentToken');

  return token || '';
};
