import React, { useCallback } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Profile, Logout } from './style';
import { getToken } from 'utils/getToken';

function UserProfile() {
  const token = getToken();
  const payload = jwtDecode(token);

  const onLogout = useCallback(() => {
    Cookies.set('zoommentToken', '', {
      days: -1,
      path: '/',
      domain: `.zoomment.com`,
      sameSite: 'None',
      secure: true,
      partitioned: true
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
