import axios from 'axios';

// 매거진 데이터 조회
export const getMagazine = async () => {
  try {
    const response = await axios.get('http://13.125.248.139:3000/magazines');

    return response.data.data;
  } catch (error) {
    console.error('매거진 데이터 조회 에러', error);
  }
};

// 매거진 상세 조회
export const getMagazineDetail = async (id: any) => {
  try {
    const response = await axios.get(`http://13.125.248.139:3000/magazines/${id}`);
    return response;
  } catch (error) {
    console.error('매거진 상세 데이터 조회 에러', error);
  }
};

// 매거진 등록
export const postMagazine = async (props: any) => {
  const title = props.title;
  const content = props.content;
  const mainImage = props.image;

  try {
    const response = await axios.post('http://13.125.248.139:3000/magazines', {
      title: title,
      content: content,
      mainImage: mainImage,
    });

    return response;
  } catch (error) {
    console.error('매거진 작성 에러', error);
  }
};

// 매거진 수정
export const putMagazine = async (props: any) => {
  const id = props.id;
  const newTitle = props.newTitle;
  const newContent = props.newContent;
  const newMainImage = props.newMainImage;

  try {
    const response = await axios.patch(`http://13.125.248.139:3000/magazines/${id}`, {
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
    const response = await axios.delete(`http://13.125.248.139:3000/magazines/${id}`);
    return response;
  } catch (error) {
    console.error('매거진 삭제 에러', error);
  }
};
