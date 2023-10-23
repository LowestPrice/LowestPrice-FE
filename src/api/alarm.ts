import axios from 'axios';
import Cookies from 'js-cookie';

export const toggleAlarm = async (productId: number | undefined) => {
  const accessToken = Cookies.get('Authorization');
  console.log(productId);
  console.log(accessToken);
  try {
    await axios.post(`https://lowest-price.store/notification/product/${productId}`, { headers: { Authorization: accessToken } });
    console.log('post 성공');
  } catch (err) {
    console.log(err);
  }
};

export const getAlarmProducts = async () => {
  const accessToken = Cookies.get('Authorization');
  console.log(accessToken);
  try {
    const response = await axios.get(`https://lowest-price.store/notification`, { headers: { Authorization: accessToken } });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
