import { useNavigate, useParams } from 'react-router-dom';
import { Container, TopBox, InfoBox, Title, Editor, TextArea, ContentButton, ContentTitle, ContentEditor, MagazineTitle, Flex, Button } from './styles';
import { MagazineProps } from '../../../type/type';
import { deleteMagazine, getMagazineDetail } from '../../../api/magazine';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const MagazineDetail: React.FC<MagazineProps> = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 데이터 불러오기
  const { isLoading, isError, data } = useQuery('posts', () => getMagazineDetail(id));
  const magazineData = data?.data.data;

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

  // 게시글 이동
  // const nextMagazine = (id: any) => {
  //   const currentId = parseInt(id, 10);
  //   const nextId = currentId + 1;
  //   const secondId = currentId + 2;
  //   const thirdId = currentId + 3;

  //   const { data: nextMagazineData } = useQuery(['posts', nextId], () => getMagazineDetail(nextId), {
  //     enabled: !isNaN(nextId),
  //   });

  //   const { data: secondMagazineData } = useQuery(['posts', secondId], () => getMagazineDetail(secondId), {
  //     enabled: !isNaN(secondId),
  //   });

  //   const { data: thirdMagazineData } = useQuery(['posts', thirdId], () => getMagazineDetail(thirdId), {
  //     enabled: !isNaN(thirdId),
  //   });

  //   return { nextMagazineData, secondMagazineData, thirdMagazineData };
  // };

  // 호출
  // const { nextMagazineData: any, secondMagazineData, thirdMagazineData } = nextMagazine(id);
  // console.log(nextMagazineData.data.data.titile, 'next title');

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
          <Title>{magazineData.title}</Title>
          <Editor>{magazineData.editor}</Editor>
        </InfoBox>
        <Flex>
          <Button onClick={() => navigate('/magazine')} key={magazineData.magazineId}></Button>
          <MagazineTitle>매거진 제목 또는 카테고리</MagazineTitle>
          <Button onClick={() => navigate(`/magazineEditing/${magazineData.magazineId}`, { state: { props: magazineData } })}></Button>
          <Button
            onClick={() => {
              onDeleteButtonHandler(id);
              navigate('/magazine');
            }}
          ></Button>
          {/* 삭제하기 */}
        </Flex>
        <img src={magazineData.mainImage} alt='매거진 이미지' />
      </TopBox>
      <TextArea>{magazineData.content}</TextArea>

      {/* {nextMagazineData && ( */}
      <ContentButton>
        <ContentTitle>{magazineData.title}</ContentTitle>
        <ContentEditor>by 관리자</ContentEditor>
      </ContentButton>
      {/*  )} */}

      {/* {secondMagazineData && ( */}
      <ContentButton>
        <ContentTitle>{magazineData.title}</ContentTitle>
        <ContentEditor>by 관리자</ContentEditor>
      </ContentButton>
      {/* )} */}

      {/* {thirdMagazineData && ( */}
      <ContentButton>
        <ContentTitle>{magazineData.title}</ContentTitle>
        <ContentEditor>by 관리자</ContentEditor>
      </ContentButton>
      {/* )} */}
    </Container>
  );
};

export default MagazineDetail;
