import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('http://13.125.248.139:3000//product');
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = async (productId: any) => {
  try {
    const response = await axios.get(`http://13.125.248.139:3000//product/${productId}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getTopten = async () => {
  try {
    const response = await axios.get(`http://13.125.248.139:3000//product/top`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 카카오 로그인

export const loginWithKakao = () => {
  const SERVER_URL = 'http://3.34.177.244' || 'http://localhost:8000';
  const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
    `${SERVER_URL}/api/kakao/callback`
  )}&client_id=1b3c349efac233223cb5b44ca84c0ff6`;
  window.location.href = kakaoOauthURL;
};
