import React, { useState } from 'react';
import { FlexBox, Button, ContentBox, Title, Content, DirectionCol, PhotoAdd, PhotoDiv } from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { putMagazine } from '../../../api/magazine';
import { useLocation } from 'react-router-dom';

const MagazineEditing: React.FC = () => {
  const location = useLocation();
  const magazineData = location.state.props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState(magazineData.title);
  const [newContent, setNewContent] = useState(magazineData.content);
  const [newMainImage, setNewImage] = useState(magazineData.mainImage);
  const queryClient = useQueryClient();

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newTitle = e.target.value;
    setNewTitle(newTitle);
  };

  const onContentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newContent = e.target.value;
    setNewContent(newContent);
  };

  const onImageChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newMainImage = e.target.value;
    setNewImage(newMainImage);
  };

  // 데이터 변경하기
  const changePost = useMutation(putMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.error('매거진 수정 에러', error);
    },
  });

  const onSubmitButtonHandler = (id: any, newTitle: string, newContent: string, newMainImage: string) => {
    changePost.mutate(
      {
        id,
        newTitle,
        newContent,
        newMainImage,
      },
      {
        onSuccess: () => {
          alert('수정 완료');
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
        <Button onClick={() => onSubmitButtonHandler(id, newTitle, newContent, newMainImage)} back-color={'transparent'} width={'80px'}>
          수정
        </Button>
      </FlexBox>
      <ContentBox>
        <DirectionCol>
          <PhotoDiv>
            <PhotoAdd></PhotoAdd>
          </PhotoDiv>
          <Title value={newTitle} defaultValue={magazineData.title} onChange={onTitleChangeHandler} />
          <Content value={newContent} defaultValue={magazineData.content} onChange={onContentChangeHandler} />
          <textarea value={newMainImage} defaultValue={magazineData.image} onChange={onImageChangeHandler} />
        </DirectionCol>
      </ContentBox>
    </>
  );
};

export default MagazineEditing;
