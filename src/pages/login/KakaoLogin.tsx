import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoLogin() {
  const navigate = useNavigate();

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const queryString = url.searchParams; // URLSearchParams {size: 1}
  const accessToken = 'Bearer ' + queryString.get('Authorization');
  const refreshToken = 'Bearer ' + queryString.get('refreshToken');

  useEffect(() => {
    document.cookie = `accessToken=${accessToken}; max-age=17000`;
    document.cookie = `refreshToken=${refreshToken}; max-age= 604800`;
    document.cookie = `isLogin=true; max-age=5`;
    navigate('/');
  }, []);

  return <div></div>;
}

export default KakaoLogin;
