import { useNavigate } from 'react-router-dom';
import { MagazineProps } from '../../../type/type';
import {
  Container,
  Header,
  Title,
  Line,
  Subtitle,
  Box,
  Img,
  BoxPadding,
  BoxTitle,
  Flex,
  Content,
  Writing,
  LikeFlex,
  InnerContainer,
  LogoTitle,
} from './styles';
import PageFooter from '../../../components/footer/PageFooter';
import { useState, useEffect } from 'react';
import { getMagazine } from '../../../api/magazine';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { postMagazineLike } from '../../../api/magazine';
import Heart from '../Heart';
import { BlueLogo } from '../../../assets/icon/icon';

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
                  <LikeFlex>
                    <Heart like={magazineData.isLiked} onClick={(event) => handleLikeClick(event, magazineData.magazineId, index)} />
                    <div>{magazineData.LikeMagazine}</div>
                  </LikeFlex>
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
