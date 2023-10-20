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
    return response.data.data;
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
    const response = await axios.get(`http://3.39.251.68:3000/product/category/${categoryName}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCategoryFilter = async (categoryName: string | undefined, filterName: string | undefined) => {
  try {
    console.log(categoryName, filterName);
    const response = await axios.get(`http://3.39.251.68:3000/product/category/${categoryName}/${filterName}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getOptions = async (realId: string | undefined) => {
  try {
    console.log(realId);
    const response = await axios.get(`http://3.39.251.68:3000/option/${realId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 검색 상품

export const getSearch = async (searchWord: string | undefined) => {
  try {
    console.log(searchWord);
    const response = await axios.get(`http://3.39.251.68:3000/search?search=${searchWord}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

// 검색한 상품 필터 -----------------------------------------------------------------------------

export const getFilteredSearch = async (filterName: string | undefined, searchWord: string | undefined) => {
  try {
    console.log(filterName, searchWord);
    const response = await axios.get(`http://3.39.251.68:3000/search/${filterName}?search=${searchWord}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

//차트

export type PriceData = {
  maxPrice: number;
  minPrice: number;
  priceHistoryForWeek: {
    [date: string]: number;
  };
};

export const getPriceHistory = async (id: any): Promise<PriceData | undefined> => {
  // console.log(id, 'api는 id값이 나올까?');
  try {
    const response = await axios.get(`http://3.39.251.68:3000/price-history/${id}`);
    return response.data;
  } catch (error) {
    console.error('가격 히스토리 에러', error);
    return undefined;
  }
};
