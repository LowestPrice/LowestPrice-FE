import { Container, Header, Title, Line, Subtitle, Box, Img, BoxPadding, BoxTitle, Flex, Content } from './styles';

const Magazine: React.FC = () => {
  return (
    <Container>
      <Header>매거진</Header>
      <Line></Line>
      <Title>Apple 트렌드</Title>
      <Subtitle>IT 트렌드, 여기서 볼 수 있어요</Subtitle>
      <Box>
        <Img>img</Img>
        <BoxPadding>
          <BoxTitle>Title</BoxTitle>
          <Content>Content</Content>
          <Flex>
            <div>에디터 OOO</div>
            <button>좋아요</button>
          </Flex>
        </BoxPadding>
      </Box>
    </Container>
  );
};

export default Magazine;
