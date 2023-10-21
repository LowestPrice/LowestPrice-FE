import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function KakaoLogin() {
  const navigate = useNavigate();

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const queryString = url.searchParams; // URLSearchParams {size: 1}
  const accessToken = 'Bearer ' + queryString.get('authorization');

  useEffect(() => {
    Cookies.set('Authorization', accessToken);
    navigate('/');
  }, []);

  return <div></div>;
}

export default KakaoLogin;
