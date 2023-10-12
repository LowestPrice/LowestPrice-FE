import { useNavigate } from 'react-router-dom';
import { Container, TopBox, InfoBox, Title, Editor, TextArea, ContentButton, ContentTitle, ContentEditor, MagazineTitle, Flex, Button } from './styles';
const MagazineDetail: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <TopBox>
        <InfoBox>
          <Title>매거진 제목</Title>
          <Editor>에디터 000</Editor>
        </InfoBox>
        <Flex>
          <Button onClick={() => navigate('/magazine')}></Button>
          <MagazineTitle>매거진 제목 또는 카테고리</MagazineTitle>
          {/* 해당 게시물 수정버튼으로 변경하기 */}
          <Button onClick={() => navigate('/magazineWriting')}></Button>
        </Flex>
      </TopBox>
      <TextArea>Content</TextArea>
      {/* 다음 매거진 페이지 -> 버튼 + Link나 navigate 사용*/}
      <ContentButton>
        <ContentTitle>매거진 타이틀</ContentTitle>
        <ContentEditor>by 000</ContentEditor>
      </ContentButton>
      <ContentButton>
        <ContentTitle>매거진 타이틀</ContentTitle>
        <ContentEditor>by 000</ContentEditor>
      </ContentButton>
      <ContentButton>
        <ContentTitle>매거진 타이틀</ContentTitle>
        <ContentEditor>by 000</ContentEditor>
      </ContentButton>
    </Container>
  );
};

export default MagazineDetail;
