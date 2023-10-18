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

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    const response = await axios.post('http://3.39.251.68:3000/magazines', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error('매거진 작성 에러', error);
    throw error;
  }
};

// 매거진 수정
export const putMagazine = async (props: any) => {
  const id = props.id;
  const newTitle = props.newTitle;
  const newContent = props.newContent;
  const newMainImage = props.newMainImage;

  try {
    const response = await axios.put(`http://3.39.251.68:3000/magazines/${id}`, {
      title: newTitle,
      content: newContent,
      mainImage: newMainImage,
    });
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

  try {
    const response = await axios.post(`http://3.39.251.68:3000/magazines/${id}/user/1/like`);
    // 유저 아이디 임의로 1 적용
    return response;
  } catch (error) {
    console.error('매거진 좋아요 등록/취소 에러', error);
  }
};
