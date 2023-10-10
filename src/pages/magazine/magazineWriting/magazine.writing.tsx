import { FlexBox, Button, ContentBox, Title, Content } from './styles';

const MagazineWriting = () => {

  return (
    <>
      <FlexBox>
        <Button>□</Button>
        <Button>등록</Button>
      </FlexBox>
      <ContentBox>
        <Title>제목</Title>
        <Content>내용을 입력하세요.</Content>
      </ContentBox>
    </>
  );
};

export default MagazineWriting;
