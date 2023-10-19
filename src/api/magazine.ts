import axios from 'axios';

// 매거진 데이터 조회
export const getMagazine = async () => {
  try {
    const response = await axios.get('http://3.39.251.68:3000/magazines');

    return response.data.data;
  } catch (error) {
    console.error('매거진 데이터 조회 에러', error);
  }
};

// 매거진 상세 조회
export const getMagazineDetail = async (id: any) => {
  try {
    const response = await axios.get(`http://3.39.251.68:3000/magazines/${id}`);
    return response;
  } catch (error) {
    console.error('매거진 상세 데이터 조회 에러', error);
  }
};

// 매거진 등록
export const postMagazine = async ({ title, content, image }: { title: any; content: any; image: any }) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', image);

    for (let [key, value] of formData.entries()) {
      console.log(key, value, '추가하기 키값 밸류값');
    }
    console.log(title, '추가하기 타이틀');
    console.log(content, '추가하기 콘텐츠');
    console.log(image, '추가하기 파일');

    const response = await axios.post('http://3.39.251.68:3000/magazines', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('매거진 작성 에러', error);
    throw error;
  }
};

// 매거진 수정
export const putMagazine = async (props: any) => {
  const { id, newTitle, newContent, newMainImage } = props;
  const formData = new FormData();
  formData.append('title', newTitle);
  formData.append('content', newContent);
  if (newMainImage) {
    formData.append('mainImage', newMainImage);
  }
  console.log(formData, 'formdata');
  console.log(newMainImage, '수정하기 이미지');
  console.log(newContent, '수정하기 콘텐츠');
  console.log(newTitle, '수정하기 타이틀');

  for (let [key, value] of formData.entries()) {
    console.log(key, value, '키값 밸류값');
  }

  try {
    const response = await axios.put(`http://3.39.251.68:3000/magazines/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response, 'response');
    return response;
  } catch (error) {
    console.error('매거진 수정 에러', error);
  }
};

// 매거진 삭제
export const deleteMagazine = async (props: any) => {
  const id = props.id;
  try {
    const response = await axios.delete(`http://3.39.251.68:3000/magazines/${id}`);
    return response;
  } catch (error) {
    console.error('매거진 삭제 에러', error);
  }
};

// 매거진 좋아요 등록/취소
export const postMagazineLike = async (props: any) => {
  const id = props.id;
  const userId = props.userId;

  try {
    const response = await axios.post(`http://3.39.251.68:3000/magazines/${id}/user/${userId}/like`);
    return response;
  } catch (error) {
    console.error('매거진 좋아요 등록/취소 에러', error);
  }
};

// 다른 매거진 리스트 조회
export const getNextMagazine = async (id: any) => {
  try {
    const response = await axios.get(`http://3.39.251.68:3000/magazines/${id}/list`);
    return response;
  } catch (error) {
    console.error('다른 매거진 리스트 조회 에러', error);
  }
};
