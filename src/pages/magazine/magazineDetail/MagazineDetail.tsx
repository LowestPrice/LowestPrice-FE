import { useNavigate, useParams } from 'react-router-dom';
import { Container, TopBox, InfoBox, Title, Editor, TextArea, ContentButton, ContentTitle, ContentEditor, MagazineTitle, Flex, Button } from './styles';
import { MagazineProps } from '../../../type/type';
import { getMagazineDetail } from '../../../api/magazine';
import { useQuery } from 'react-query';

const MagazineDetail: React.FC<MagazineProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, isError, data } = useQuery('magazineDetailData', () => getMagazineDetail(id));

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <Container>
      <TopBox>
        <InfoBox>
          <Title>{data?.data.data.title}</Title>
          <Editor>{data?.data.data.editor}</Editor>
        </InfoBox>
        <Flex>
          <Button onClick={() => navigate('/magazine')} key={data?.data.data.magazineId}></Button>
          <MagazineTitle>매거진 제목 또는 카테고리</MagazineTitle>
          {/* 해당 게시물 수정버튼으로 변경하기 */}
          <Button onClick={() => navigate(`/magazineEditing/${data?.data.data.magazineId}`)}></Button>
        </Flex>
      </TopBox>

      <TextArea>{data?.data.data.content}</TextArea>

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
