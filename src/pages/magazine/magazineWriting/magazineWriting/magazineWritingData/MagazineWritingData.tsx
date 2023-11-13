import React, { useState, useMemo, useCallback } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

import { FlexBox, Button, DirectionCol, PhotoAdd, PhotoDiv, Title, StyledImage, styleString, Container, Scroll } from '../../styles';
import { BackIcon, AddImageIcon } from '../../../../../assets/icon/icon';

import { postMagazine } from '../../../../../api/magazine';

const MagazineWritingData = () => {
  // React Quill 글자 크기 커스텀
  // const CustomSize = ReactQuill.Quill.import('attributors/style/size');
  // CustomSize.whitelist = ['12px', '14px', '16px', '18px', '20px'];
  // ReactQuill.Quill.register(CustomSize, true);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 데이터 추가하기
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const addPosts = useMutation(postMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.log('changePosts 에러', error);
    },
  });

  const onTitleChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setTitle(e.target.value);
    },
    [title]
  );

  const onContentChangeHandler = useCallback(
    (value: string): void => {
      setContent(value);
    },
    [content]
  );

  const imageHandler = async (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    if (file) {
      // 이미지를 미리보기로 보여주는 부분
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitButtonHandler = useCallback(
    (title: any, content: any, image: any) => {
      addPosts.mutate(
        { title, content, image },
        {
          onSuccess: () => {
            toast.success('추가되었습니다✅');
            navigate('/magazine');
          },
          onError: (error) => {
            console.error('매거진 추가 에러', error);
          },
        }
      );
    },
    [title, content, image]
  );

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          // [{ size: ['12px', '14px', '16px', '18px', '20px'] }],
          // [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
        ],
      },
    };
  }, []);

  return (
    <>
      <Helmet title='내일은 최저가 | 매거진 작성' />
      <Container>
        <Scroll>
          <style dangerouslySetInnerHTML={{ __html: styleString }} />
          <FlexBox>
            <Button onClick={() => navigate('/magazine')}>
              <BackIcon />
            </Button>
            <Button onClick={() => onSubmitButtonHandler(title, content, image)}>등록</Button>
          </FlexBox>
          <DirectionCol>
            <PhotoDiv>
              <PhotoAdd>
                <label>
                  <input style={{ display: 'none' }} onChange={imageHandler} type='file' accept='image/*' />
                  <AddImageIcon />
                </label>
              </PhotoAdd>
            </PhotoDiv>
            <Title placeholder='제목' onChange={onTitleChangeHandler} value={title} />
            {previewImage && <StyledImage src={previewImage} alt='매거진 이미지' />}
            <ReactQuill
              theme='snow'
              placeholder='내용을 입력하세요'
              onChange={onContentChangeHandler}
              value={content}
              modules={modules}
              style={{ overflowY: 'auto', minHeight: '78vh', boxSizing: 'border-box', overflow: 'hidden', border: '1px solid #D9D9D9' }}
              preserveWhitespace
            />
          </DirectionCol>
        </Scroll>
      </Container>
    </>
  );
};

export default React.memo(MagazineWritingData);
