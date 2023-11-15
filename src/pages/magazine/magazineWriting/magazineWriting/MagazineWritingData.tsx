import React, { useState, useMemo, useCallback, useRef } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

import { FlexBox, Button, DirectionCol, PhotoAdd, PhotoDiv, StyledImage, Container, Scroll, Title } from '../styles';
import { BackIcon, AddImageIcon } from '../../../../assets/icon/icon';

import { postMagazine, postQuillEditorPhoto } from '../../../../api/magazine';

const MagazineWritingData = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 데이터 추가하기
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const quillRef = useRef<any>(null);

  const addPosts = useMutation(postMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.log('changePosts 에러', error);
    },
  });

  const onTitleChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTitle(e.target.value);
  }, []);

  const onContentChangeHandler = useCallback((value: string): void => {
    setContent(value);
  }, []);

  const onImageChangeHandler = async (e: any) => {
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

  const onSubmitButtonHandler = useCallback((title: any, content: any, image: any) => {
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
  }, []);

  // 퀼 에디터 사진 변환
  const imageHandler = () => {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener('change', async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        // multer에 맞는 형식으로 데이터 만들어준다.

        try {
          const res = await postQuillEditorPhoto(file);
          if (res.data) {
            const imgUrl = res.data;
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', imgUrl);
          } else {
            console.log('응답이 없습니다');
          }
        } catch (error) {
          console.log('사진 업로드 실패했어요', error);
        }
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }], //normal은 false로
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <>
      <Container>
        <Scroll>
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
                  <input style={{ display: 'none' }} onChange={onImageChangeHandler} type='file' accept='image/*' />
                  <AddImageIcon />
                </label>
              </PhotoAdd>
            </PhotoDiv>
            <Title placeholder='제목' onChange={onTitleChangeHandler} value={title} />
            {previewImage && <StyledImage src={previewImage} alt='매거진 이미지' />}
            <ReactQuill
              ref={quillRef}
              theme='snow'
              placeholder='내용을 입력하세요'
              onChange={onContentChangeHandler}
              value={content}
              modules={modules}
              style={{ minHeight: '100vh', boxSizing: 'border-box', border: '1px solid #D9D9D9' }}
              preserveWhitespace
            />
          </DirectionCol>
        </Scroll>
      </Container>
    </>
  );
};

export default React.memo(MagazineWritingData);
