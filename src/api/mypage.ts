import axios from 'axios';

export const getAlarmProduct = async (accessToken: string) => {
  try {
    const response = await axios.get(`https://lowest-price.store/notification/user/`, { headers: { Authorization: accessToken } });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
