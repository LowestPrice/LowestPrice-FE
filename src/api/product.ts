import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('http://13.209.68.221:3000/product');
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = async (productId: any) => {
  try {
    const response = await axios.get(`http://13.209.68.221:3000/product/${productId}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getTopten = async () => {
  try {
    const response = await axios.get(`http://13.124.137.173:3000/product/top`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
