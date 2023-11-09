import { useState, useEffect } from 'react';
import { getMagazine } from '../../../../api/magazine';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLike } from '../../../../hooks/useLike';
import Like from '../../Like';
import { BlueLogo } from '../../../../assets/icon/icon';

const MagazineMainData = () => {
  const [magazines, setMagazines] = useState<any[]>([]);
  const navigate = useNavigate();

  // 매거진 데이터 불러오기
  const { isLoading, isError, data } = useQuery('magazineData', getMagazine);
  const isAdmin = data?.admin;

  useEffect(() => {
    if (data) {
      const responseData = data.data;
      setMagazines(responseData);
    }
  }, [data]);

  // 좋아요 클릭 시 좋아요 상태와 좋아요 수 업데이트
  const { handleLikeClick } = useLike(false, 0);

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <>
      <Header onClick={() => navigate('/magazine')}>
        <BlueLogo />
        <LogoTitle>매거진</LogoTitle>
      </Header>
      <Container>
        <Line></Line>
        <Title>Apple 트렌드</Title>
        <Subtitle>IT 트렌드, 여기서 볼 수 있어요</Subtitle>
        {isAdmin && <Writing onClick={() => navigate('/magazineWriting')}>글쓰기</Writing>}

        <Scroll>
          {magazines?.map((magazineData, index) => {
            // html 마크업 제거 후 렌더링
            const textOnly = magazineData.content.replace(/<\/?[^>]+(>|$)/g, '');
            const displayText = textOnly.length > 53 ? `${textOnly.substring(0, 53)}...` : textOnly;
            return (
              <Item key={magazineData.magazineId}>
                <Box
                  key={index}
                  onClick={() => navigate(`/magazine/${magazineData.magazineId}`, { state: { index } })}
                  style={index === magazines.length - 1 ? { marginBottom: '7rem' } : undefined}
                >
                  <Img src={magazineData.mainImage} />
                  <BoxPadding>
                    <BoxTitle>{magazineData.title}</BoxTitle>
                    <Content>{displayText}</Content>
                    <Flex>
                      <div>{magazineData.editor}</div>
                      <Like
                        isLiked={magazineData.isLiked}
                        magazineId={magazineData.magazineId}
                        likeCount={magazineData.LikeMagazine}
                        handleLikeClick={(event) => handleLikeClick(event, magazineData.magazineId, index, setMagazines)}
                        index={index}
                      />
                    </Flex>
                  </BoxPadding>
                </Box>
              </Item>
            );
          })}
        </Scroll>
      </Container>
    </>
  );
};

export default MagazineMainData;

const Header = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 1.62rem;
  padding-bottom: 1.12rem;
  padding-left: 1.25rem;
  padding-right: 17.62rem;
  cursor: pointer;

  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const LogoTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 110%;
  margin-left: 0.25rem;
  width: 2.9375rem;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  padding-bottom: 9.375rem;
  position: fixed;
  margin-top: 68px;

  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const Scroll = styled.div`
  width: 23.75rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 75vh;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  text-align: left;
  width: 100%;
  padding-top: 1.11375rem;
  padding-left: 2.5rem;
  line-height: 100%;
`;

const Line = styled.div`
  border-top: 0.0625rem solid grey;
`;

const Subtitle = styled.div<{ isAdmin?: boolean }>`
  font-size: 0.875rem;
  color: grey;
  margin-top: 1%;
  font-weight: 600;
  text-align: left;
  width: 100%;
  margin-left: 2.5rem;
  margin-bottom: ${(props) => (props.isAdmin ? '0' : '1.25rem')};
`;

const Img = styled.img`
  width: 20.9375rem;
  height: 60%;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
`;

const BoxPadding = styled.div`
  padding: 5% 3% 5% 3%;
`;

const BoxTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
`;

const Content = styled.div`
  margin: 1% 0 1% 0;
  font-size: 0.875rem;
  font-weight: 400;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 400;
`;

const Writing = styled.div`
  width: 20.1875rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #b5b5b5;
  cursor: pointer;
  margin-bottom: 0.75rem;
  text-align: right;
  line-height: 110%;
  text-decoration-line: underline;
  display: flex;
  justify-content: flex-end;
`;

const Box = styled.div`
  width: 20.9375rem;
  height: 19.6875rem;
  margin-bottom: 1.625rem;
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  background-color: white;
`;
