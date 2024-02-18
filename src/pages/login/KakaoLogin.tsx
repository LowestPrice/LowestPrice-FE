import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoLogin() {
  const navigate = useNavigate();

  // queryString 으로 accessToken 받아오기 --------------------------

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const queryString = url.searchParams; // URLSearchParams {size: 1}

  // accessToken, refreshToken 가공 ---------------------------------

  const accessToken = 'Bearer ' + queryString.get('Authorization');
  const refreshToken = 'Bearer ' + queryString.get('refreshToken');

  // accessToken, refreshToken 쿠키에 저장한 뒤, 메인페이지로 이동 -----------------------

  useEffect(() => {
    document.cookie = `accessToken=${accessToken}; max-age=17000; SameSite=strict; Secure=true; HttpOnly=true;`;
    document.cookie = `refreshToken=${refreshToken}; max-age= 604800; max-age=17000; SameSite=strict; Secure=true; HttpOnly=true;`;
    document.cookie = `isLogin=true; max-age=5`;
    navigate('/');
  }, []);

  return <></>;
}

export default KakaoLogin;
