import Cookies from 'js-cookie';
import axios from 'axios';

// 카카오 로그인

export const loginWithKakao = () => {
  const SERVER_URL = `${import.meta.env.VITE_API_KEY}` || 'http://localhost:5173';
  // const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
  //   `${SERVER_URL}/api/kakao/callback`
  // )}&client_id=${encodeURIComponent(`${import.meta.env.VITE_KAKAO_CLIENT_ID}`)}`;
  // window.location.href = kakaoOauthURL;

  window.Kakao.Auth.authorize({
    redirectUri: `${SERVER_URL}/api/kakao/callback`,
  });
};

// 임시 로그인
export const temporaryLogin = () => {
  const SERVER_URL = `${import.meta.env.VITE_API_KEY}` || 'http://localhost:5173';
  const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
    `${SERVER_URL}/api/kakao/temporary-login`
  )}&client_id=${encodeURIComponent(import.meta.env.VITE_KAKAO_CLIENT_ID)}`;
  window.location.href = kakaoOauthURL;
};

// 카카오 회원 탈퇴

export const DeleteIdWithKakao = async () => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;
  Cookies.remove('Authorization');
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_KEY}/kakao/deactivate`);
    return response;
  } catch (error) {
    console.error('회원 탈퇴 에러', error);
  }
};

// 로그아웃

export const postLogout = async () => {
  const accessToken = Cookies.get('Authorization');
  axios.defaults.headers.common['Authorization'] = accessToken;

  try {
    const kakaoOauthURL = `https://kauth.kakao.com/oauth/logout?client_id=${encodeURIComponent(
      `${import.meta.env.VITE_KAKAO_CLIENT_ID}`
    )}&logout_redirect_uri=https://lowest-price.store`;
    window.location.href = kakaoOauthURL;
    Cookies.remove('Authorization');
  } catch (error) {
    console.error('로그아웃 에러', error);
  }
};
