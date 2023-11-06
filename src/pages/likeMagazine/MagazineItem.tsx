import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getLikedMagazineLists } from '../../api/magazine';
import { useNavigate } from 'react-router';

const MagazineItem = () => {
  // 데이터 불러오기
  const { isLoading, isError, data } = useQuery('likeData', getLikedMagazineLists);
  const navigate = useNavigate();

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <List>
      {data?.data.data.map((item: any, index: any) => (
        <Item
          key={index}
          style={{ backgroundImage: `url(${item.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
          onClick={() => navigate(`/magazine/${item.magazineId}`)}
        >
          <Overlay>
            <ItemMargin>
              <Title>{item.title}</Title>
              <Editor>by 관리자</Editor>
            </ItemMargin>
          </Overlay>
        </Item>
      ))}
    </List>
  );
};

export default MagazineItem;

const List = styled.div`
  margin-bottom: 3rem;
`;

const Item = styled.button`
  height: 7.8125rem;
  background-color: rgba(217, 217, 217, 1);
  margin-bottom: 0.25rem;
  display: flex;
  flex-direction: column;
  width: 23.4375rem;
  position: relative;
  border: none;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const Title = styled.div`
  color: #fff;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 110%;
  margin-bottom: 0.75rem;
  display: flex;
`;

const Editor = styled.div`
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 110%;
  text-align: left;
`;

const ItemMargin = styled.div`
  margin-top: 3.75rem;
  margin-left: 1.25rem;
  margin-bottom: 1.4375rem;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 23.4375rem;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;
