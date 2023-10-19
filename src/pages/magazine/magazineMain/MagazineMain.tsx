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
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const queryclient = useQueryClient();

  // 매거진 데이터 불러오기
  const { isLoading, isError, data } = useQuery('magazineData', getMagazine);
  console.log(data);

  useEffect(() => {
    if (data) {
      setMagazines(data);
    }
  }, [data]);

  // 좋아요
  const magazineLike = useMutation(postMagazineLike, {
    onSuccess: () => {
      queryclient.invalidateQueries('posts');
      setLike(!like);
    },
    onError: (error) => {
      console.error('좋아요 error 발생', error);
    },
  });

  const handleLikeClick = (event: React.MouseEvent, magazineId: string) => {
    event.stopPropagation();
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
          {magazines?.map((data, index) => (
            <Box key={index} onClick={() => navigate(`/magazine/${data.magazineId}`)}>
              <Img src={data.mainImage} />
              <BoxPadding>
                <BoxTitle>{data.title}</BoxTitle>
                <Content>{data.content.length > 53 ? `${data.content.substring(0, 53)}...` : data.content}</Content>
                <Flex>
                  <div>{data.editor}</div>
                  <LikeFlex>
                    <Heart like={like} onClick={(event) => handleLikeClick(event, data.magazineId)} />
                    <div>{data.LikeMagazine}</div>
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
