import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('http://3.39.251.68:3000/product');
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = async (productId: string | undefined) => {
  try {
    console.log(productId);
    const response = await axios.get(`http://3.39.251.68:3000/product/${productId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTopten = async () => {
  try {
    const response = await axios.get(`http://3.39.251.68:3000/product/top`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCategory = async (categoryName: string | undefined) => {
  try {
    console.log(categoryName);
    const response = await axios.get(`http://3.39.251.68:3000/product/category/${categoryName}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

// 카카오 로그인

export const loginWithKakao = () => {
  const SERVER_URL = 'http://3.39.251.68:3000' || 'http://localhost:5173';
  const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
    `${SERVER_URL}/api/kakao/callback`
  )}&client_id=1b3c349efac233223cb5b44ca84c0ff6`;
  window.location.href = kakaoOauthURL;
};
