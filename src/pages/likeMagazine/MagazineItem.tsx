import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getLikedMagazineLists } from '../../api/magazine';

const MagazineItem = () => {
  // 데이터 불러오기
  const { isLoading, isError, data } = useQuery('likeData', getLikedMagazineLists);
  console.log(data?.data.data, '내가 좋아요 누른 매거진');
  console.log(data?.data.data[0].title, '내가 좋아요 누른 매거진');

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <Wrap>
      <Article>
        {data?.data.data.map((item: any, index: any) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <div>by 관리자</div>
          </div>
        ))}
      </Article>
    </Wrap>
  );
};

export default MagazineItem;

const Wrap = styled.div`
  width: 100%;
  height: 150px;
  background-color: rgba(217, 217, 217, 1);
`;

const Article = styled.div``;
