import { useNavigate } from 'react-router-dom';
import { MagazineProps } from '../../../type/type';
import PageFooter from '../../../components/footer/PageFooter';
import { useState, useEffect } from 'react';
import { getMagazine } from '../../../api/magazine';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { postMagazineLike } from '../../../api/magazine';
import { BlueLogo } from '../../../assets/icon/icon';
import styled from 'styled-components';
import Like from '../Like';

const Magazine: React.FC<MagazineProps> = () => {
  const [magazines, setMagazines] = useState<any[]>([]);
  const navigate = useNavigate();
  const queryclient = useQueryClient();

  // 매거진 데이터 불러오기
  const { isLoading, isError, data } = useQuery('magazineData', getMagazine);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  console.log(data, '매거진 메인 데이터');

  useEffect(() => {
    if (data) {
      setMagazines(data);
      setLike(data.isLiked);
      setLikeCount(data.LikeMagazine);
    }
  }, [data]);

  // 좋아요 하기
  const magazineLike = useMutation(postMagazineLike, {
    onSuccess: () => {
      queryclient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.error('좋아요 error 발생', error);
    },
  });

  const handleLikeClick = (event: React.MouseEvent, magazineId: string, index: number) => {
    event.stopPropagation();
    setMagazines((prevMagazines) => {
      const updatedMagazines = [...prevMagazines];
      updatedMagazines[index].isLiked = !updatedMagazines[index].isLiked;
      updatedMagazines[index].LikeMagazine += updatedMagazines[index].isLiked ? 1 : -1;
      return updatedMagazines;
    });
    magazineLike.mutate({ id: magazineId });
  };

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <>
      <Header>
        <BlueLogo />
        <LogoTitle>매거진</LogoTitle>
      </Header>
      <Container>
        <InnerContainer>
          <Line></Line>
          <Title>Apple 트렌드</Title>
          <Subtitle>IT 트렌드, 여기서 볼 수 있어요</Subtitle>
          <Writing onClick={() => navigate('/magazineWriting')}>글쓰기</Writing>
          {magazines?.map((magazineData, index) => (
            <Box key={index} onClick={() => navigate(`/magazine/${magazineData.magazineId}`)}>
              <Img src={magazineData.mainImage} />
              <BoxPadding>
                <BoxTitle>{magazineData.title}</BoxTitle>
                <Content>{magazineData.content.length > 53 ? `${magazineData.content.substring(0, 53)}...` : magazineData.content}</Content>
                <Flex>
                  <div>{magazineData.editor}</div>
                  <Like
                    isLiked={magazineData.isLiked}
                    magazineId={magazineData.magazineId}
                    likeCount={magazineData.LikeMagazine}
                    handleLikeClick={handleLikeClick}
                    index={index}
                  />
                </Flex>
              </BoxPadding>
            </Box>
          ))}
          <PageFooter />
        </InnerContainer>
      </Container>
    </>
  );
};

export default Magazine;

const Container = styled.div`
  width: 375px;
  min-height: 100vh;
  margin: 0 auto;
  padding-bottom: 82px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f3f3;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 26px 274px 18px 20px;
`;

const LogoTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  line-height: 110%;
  margin-left: 6px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  width: 100%;
  padding-top: 17.82px;
  padding-left: 40px;
  line-height: 100%;
`;

const Line = styled.div`
  border-top: 1px solid grey;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: grey;
  margin-top: 1%;
  font-weight: 600;
  text-align: left;
  width: 100%;
  margin-left: 40px;
`;

const Writing = styled.div`
  width: 323px;
  font-size: 18px;
  font-weight: 600;
  color: #b5b5b5;
  cursor: pointer;
  width: 100%;
  margin-right: 56px;
  margin-bottom: -16px;
  text-align: right;
  line-height: 110%;
  text-decoration-line: underline;
`;

const Box = styled.div`
  width: 335px;
  height: 315px;
  margin-top: 26px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

const Img = styled.img`
  width: 335px;
  height: 60%;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
`;

const BoxPadding = styled.div`
  padding: 5% 3% 5% 3%;
`;

const BoxTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const Content = styled.div`
  margin: 1% 0% 1% 0%;
  font-size: 14px;
  font-weight: 400;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
`;
