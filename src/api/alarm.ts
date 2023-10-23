import axios from 'axios';

export const toggleAlarm = async (productId: string | undefined, accessToken: string) => {
  try {
    const response = await axios.post(`https://lowest-price.store/user/product/${productId}`, { headers: { Authorization: accessToken } });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAlarmProduct = async (accessToken: string) => {
  try {
    const response = await axios.get(`https://lowest-price.store/notification/user/`, { headers: { Authorization: accessToken } });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
