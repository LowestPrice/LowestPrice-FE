import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  TopBox,
  InfoBox,
  Title,
  Editor,
  TextArea,
  ContentButton,
  ContentTitle,
  ContentEditor,
  MagazineTitle,
  Flex,
  Button,
  Img,
  AnotherMagazine,
} from './styles';
import { MagazineProps } from '../../../type/type';
import { deleteMagazine, getMagazineDetail, getNextMagazine } from '../../../api/magazine';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const MagazineDetail: React.FC<MagazineProps> = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 데이터 불러오기
  const { isLoading: isLoadingDetail, isError: isErrorDetail, data: dataDetail } = useQuery(['posts', id], () => getMagazineDetail(id));
  const magazineData = dataDetail?.data.data;

  // 데이터 삭제하기
  const deletePosts = useMutation(deleteMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.log('error 발생', error);
    },
  });

  const onDeleteButtonHandler = (id: any) => {
    deletePosts.mutate({ id });
    alert('삭제되었습니다.');
  };

  // 다른 매거진
  const { isLoading: isLoadingAnother, isError: isErrorAnoter, data: dataAnother } = useQuery('anotherPosts', () => getNextMagazine(id));
  const anotherMagazine = dataAnother?.data.data;
  console.log(anotherMagazine, 'anothermagazine');

  if (isLoadingDetail || isLoadingAnother) {
    return <h1>로딩중입니다</h1>;
  }

  if (isErrorDetail || isErrorAnoter) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <Container>
      <TopBox>
        <InfoBox>
          <Title>{magazineData.title}</Title>
          <Editor>{magazineData.editor}</Editor>
        </InfoBox>
        <Flex>
          <Button onClick={() => navigate('/magazine')} key={magazineData.magazineId}></Button>
          <MagazineTitle>{magazineData.title}</MagazineTitle>
          <Button onClick={() => navigate(`/magazineEditing/${magazineData.magazineId}`, { state: { props: magazineData } })}></Button>
          <Button
            onClick={() => {
              onDeleteButtonHandler(id);
              navigate('/magazine');
            }}
          ></Button>
        </Flex>
        <Img src={magazineData.mainImage} alt='매거진 이미지' />
      </TopBox>
      <TextArea>{magazineData.content}</TextArea>
      <AnotherMagazine>다른 매거진 보기</AnotherMagazine>
      {anotherMagazine &&
        anotherMagazine.slice(0, 4).map((magazine: any, index: any) => (
          <ContentButton key={index} style={{ backgroundImage: `url(${magazine.mainImage})` }} onClick={() => navigate(`/magazine/${magazine.magazineId}`)}>
            <ContentTitle>{magazine.title}</ContentTitle>
            <ContentEditor>by 관리자</ContentEditor>
          </ContentButton>
        ))}
    </Container>
  );
};

export default MagazineDetail;
