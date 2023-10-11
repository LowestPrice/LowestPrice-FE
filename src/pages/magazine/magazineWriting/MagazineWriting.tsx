import React, { useState } from 'react';
import { FlexBox, Button, ContentBox, Title, Content, DirectionCol, PhotoAdd, PhotoDiv } from './styles';
import { useNavigate } from 'react-router-dom';

const MagazineWriting: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saveContent, setSaveContent] = useState<unknown[]>([]);

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const onContentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setContent(e.target.value);
  };

  const onSubmitButtonHandler = () => {
    const newContent = {
      title,
      content,
    };

    setSaveContent([...saveContent, newContent]);
    setTitle('');
    setContent('');
    console.log(setSaveContent);
  };
  return (
    <>
      <FlexBox>
        <Button onClick={() => navigate('/magazine')} back-color={'#b1b1b1'} width={'24px'}></Button>
        <Button onClick={onSubmitButtonHandler} back-color={'transparent'} width={'80px'}>
          등록
        </Button>
      </FlexBox>
      <ContentBox>
        <DirectionCol>
          <PhotoDiv>
            <PhotoAdd></PhotoAdd>
          </PhotoDiv>
          <Title type='text' placeholder='제목' onChange={onTitleChangeHandler} />
          <Content type='text' placeholder='내용을 입력하세요' onChange={onContentChangeHandler} />
        </DirectionCol>
      </ContentBox>
    </>
  );
};

export default MagazineWriting;
