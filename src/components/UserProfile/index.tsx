import React, { useCallback } from 'react';
import { setCookie } from 'react-use-cookie';
import { jwtDecode } from 'jwt-decode';
import { Profile, Logout } from './style';
import { getToken } from 'utils/getToken';

function UserProfile() {
  const token = getToken();
  const payload = jwtDecode(token);

  const onLogout = useCallback(() => {
    setCookie('zoommentToken', '', {
      days: -1
      // path: '/',
      // domain: `.zoomment.com`,
      // SameSite: 'None',
      // Secure: true
    });

    const url = new URL(window.location.href);

    if (url.searchParams.has('zoommentToken')) {
      url.searchParams.delete('zoommentToken');
    }

    window.location.href = url.toString();
  }, []);

  return (
    payload && (
      <Profile>
        {payload.email} (<Logout onClick={onLogout}>logout</Logout>)
      </Profile>
    )
  );
}

export default UserProfile;
