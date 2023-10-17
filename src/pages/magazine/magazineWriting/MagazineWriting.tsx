import React, { useState } from 'react';
import { FlexBox, Button, ContentBox, Title, Content, DirectionCol, PhotoAdd, PhotoDiv } from './styles';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/footer/Footer';
import { useQueryClient, useMutation } from 'react-query';
import { postMagazine } from '../../../api/magazine';

const MagazineWriting: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 데이터 추가하기
  const [title, setTitle] = useState<any>('');
  const [content, setContent] = useState<any>('');
  const [image, setImage] = useState<any>(null);

  const addPosts = useMutation(postMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.log('changePosts 에러', error);
    },
  });

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTitle(e.target.value);
  };

  const onContentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
  };

  const onImageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const imageFile = e.target.files?.[0];
    setImage(imageFile);
  };

  const onSubmitButtonHandler = (title: any, content: any, image: any) => {
    console.log(title, content, image, '롸이팅 페이지');
    addPosts.mutate(
      { title, content, image },
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
          <Title placeholder='제목' onChange={onTitleChangeHandler} value={title} />
          <Content placeholder='내용을 입력하세요' onChange={onContentChangeHandler} value={content} />
          <input placeholder='이미지' onChange={onImageChangeHandler} type='file' accept='image/*' />
        </DirectionCol>
      </ContentBox>
      <Footer />
    </>
  );
};

export default MagazineWriting;
