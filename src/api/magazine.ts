import axios from 'axios';

// 매거진 데이터 조회
export const getMagazine = async () => {
  try {
    const response = await axios.get('http://43.200.173.183:3000/magazines');

    return response.data.data;
  } catch (error) {
    console.error('매거진 데이터 조회 에러', error);
  }
};

// 매거진 상세 조회
export const getMagazineDetail = async (Id: any) => {
  try {
    const response = await axios.get(`http://43.200.173.183:3000/magazines/${Id}`);
    return response;
  } catch (error) {
    console.error('매거진 상세 데이터 조회 에러', error);
  }
};

// 매거진 등록
export const postMagazine = async (props: any) => {
  const newTitle = props.title;
  const newContent = props.content;
  const newMainImage = props.image;

  try {
    const response = await axios.post('http://43.200.173.183:3000/magazines', {
      title: newTitle,
      content: newContent,
      mainImage: newMainImage,
    });

    return response;
  } catch (error) {
    console.error('매거진 작성 에러', error);
  }
};

// 매거진 수정
export const putMagazine = async ({ Id, newTitle, newContent, newMainImage }: { Id: any; newTitle: any; newContent: any; newMainImage: any }) => {
  try {
    const response = await axios.put(`http://43.200.173.183:3000/magazines/${Id}`, {
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
export const deleteMagazine = async (Id: any) => {
  try {
    const response = await axios.delete(`http://43.200.173.183:3000/magazines/${Id}`);
    return response;
  } catch (error) {
    console.error('매거진 삭제 에러', error);
  }
};
