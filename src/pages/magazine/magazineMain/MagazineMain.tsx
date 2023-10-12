import { useNavigate } from 'react-router-dom';
import { MagazineProps } from '../../../type/type';
import { Container, Header, Title, Line, Subtitle, Box, Img, BoxPadding, BoxTitle, Flex, Content, Writing } from './styles';

const Magazine: React.FC<MagazineProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Header>매거진</Header>
      <Line></Line>
      <Title>Apple 트렌드</Title>
      <Subtitle>IT 트렌드, 여기서 볼 수 있어요</Subtitle>
      <Writing onClick={() => navigate('/magazineWriting')}>글쓰기</Writing>
      <Box onClick={() => navigate('/magazineDetail')}>
        <Img>img</Img>
        <BoxPadding>
          <BoxTitle>{data.title}</BoxTitle>
          <Content>{data.content}</Content>
          <Flex>
            <div>{data.editor}</div>
            <button>{data.likes}</button>
          </Flex>
        </BoxPadding>
      </Box>
    </Container>
  );
};

export default Magazine;
