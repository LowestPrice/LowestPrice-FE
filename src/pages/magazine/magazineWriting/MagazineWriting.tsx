import React, { useState } from 'react';
import { FlexBox, Button, ContentBox, Title, Content, DirectionCol, PhotoAdd, PhotoDiv } from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../../components/footer/Footer';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getMagazineDetail, postMagazine } from '../../../api/magazine';

const MagazineWriting: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const magazineId = params.id;
  const queryClient = useQueryClient();

  // 데이터 불러오기
  const { isLoading, isError, data } = useQuery(['posts', magazineId], () => getMagazineDetail(magazineId), {
    enabled: !!magazineId,
  });

  if (isLoading) {
    return <h1>로딩 중입니다.</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  // 데이터 추가하기
  const [title, setTitle] = useState<any>('');
  const [content, setContent] = useState<any>('');
  const [image, setImage] = useState<any>('');

  const addPosts = useMutation(postMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.log('changePosts 에러', error);
    },
  });

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onContentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setContent(e.target.value);
  };

  const onImageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setImage(e.target.value);
  };

  const onSubmitButtonHandler = (newTitle: any, newContent: any, newImage: any) => {
    addPosts.mutate(
      { title: newTitle, content: newContent, image: newImage },
      {
        onSuccess: () => {
          alert('추가 완료');
          navigate('/magazine');
        },
        onError: (error) => {
          console.error('매거진 추가 에러', error);
        },
      }
    );
  };

  // 데이터 삭제하기

  return (
    <>
      <FlexBox>
        <Button onClick={() => navigate('/magazine')} back-color={'#b1b1b1'} width={'24px'}></Button>
        <Button onClick={() => onSubmitButtonHandler(title, content, image)} back-color={'transparent'} width={'80px'}>
          등록
        </Button>
      </FlexBox>
      <ContentBox>
        <DirectionCol>
          <PhotoDiv>
            <PhotoAdd></PhotoAdd>
          </PhotoDiv>
          <Title type='text' placeholder='제목' onChange={onTitleChangeHandler} value={title} />
          <Content type='text' placeholder='내용을 입력하세요' onChange={onContentChangeHandler} value={content} />
          <input type='text' onChange={onImageChangeHandler} value={image} />
        </DirectionCol>
      </ContentBox>
      <Footer />
    </>
  );
};

export default MagazineWriting;
