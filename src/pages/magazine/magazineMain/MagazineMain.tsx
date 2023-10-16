import { useNavigate } from 'react-router-dom';
import { MagazineProps } from '../../../type/type';
import { Container, Header, Title, Line, Subtitle, Box, Img, BoxPadding, BoxTitle, Flex, Content, Writing } from './styles';
import Footer from '../../../components/footer/Footer';
import { useState, useEffect } from 'react';
import { getMagazine } from '../../../api/magazine';
import { useQuery } from 'react-query';

const Magazine: React.FC<MagazineProps> = () => {
  const [magazines, setMagazines] = useState<any[]>([]);
  const navigate = useNavigate();

  // 매거진 데이터 불러오기
  const { isLoading, isError, data } = useQuery('magazineData', getMagazine);

  useEffect(() => {
    if (data) {
      setMagazines(data);
    }
  }, [data]);

  if (isLoading) {
    <h1>로딩중입니다</h1>;
  }
  if (isError) {
    <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <>
      <Container>
        <Header>매거진</Header>
        <Line></Line>
        <Title>Apple 트렌드</Title>
        <Subtitle>IT 트렌드, 여기서 볼 수 있어요</Subtitle>
        <Writing onClick={() => navigate('/magazineWriting')}>글쓰기</Writing>
        {magazines?.map((data, index) => (
          <Box key={index} onClick={() => navigate(`/magazine/${data.magazineId}`)}>
            <Img src={data.mainImage} />
            <BoxPadding>
              <BoxTitle>{data.title}</BoxTitle>
              <Content>{data.content.length > 20 ? `${data.content.substring(0, 20)}...` : data.content}</Content>
              <Flex>
                <div>{data.editor}</div>
                <button>{data.LikeMagazine}</button>
              </Flex>
            </BoxPadding>
          </Box>
        ))}
        <Footer />
      </Container>
    </>
  );
};

export default Magazine;
