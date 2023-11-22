import React, { useState, useRef, useMemo } from 'react';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

import { FlexBox, Button, Title, DirectionCol, PhotoAdd, PhotoDiv, StyledImage, Container, Scroll } from '../styles';
import { AddImageIcon } from '../../../../assets/icon/icon';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { getMagazineDetail, putMagazine, postQuillEditorPhoto } from '../../../../api/magazine';

const MagazineEditingData = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 데이터 불러오기
  const { isLoading, isError, data } = useQuery(['posts', id], () => getMagazineDetail(id));
  const magazineData = data?.data;

  const [newTitle, setNewTitle] = useState(magazineData.title);
  const [newContent, setNewContent] = useState(magazineData.content);
  const [newMainImage, setNewImage] = useState(magazineData.mainImage);
  const [previewImage, setPreviewImage] = useState<string>(magazineData.mainImage);

  const quillRef = useRef<ReactQuill | null>(null);

  const queryClient = useQueryClient();

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNewTitle(e.target.value);
  };

  const onContentChangeHandler = (value: string): void => {
    setNewContent(value);
  };

  const onImageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newMainImage = e.target.files?.[0];
    setNewImage(newMainImage);
    if (newMainImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(newMainImage);
    }
  };

  const changePost = useMutation(putMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.error('매거진 수정 에러', error);
    },
  });

  const onSubmitButtonHandler = (id: string, newTitle: string, newContent: string, newMainImage: string) => {
    changePost.mutate(
      {
        id,
        newTitle,
        newContent,
        newMainImage,
      },
      {
        onSuccess: () => {
          toast.success('수정되었습니다✅');
          navigate('/magazine');
        },
        onError: (error) => {
          console.error('매거진 추가 에러', error);
        },
      }
    );
  };

  // 퀼 에디터 사진 변환
  const imageHandler = () => {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지 버튼을 클릭하면 이 input이 클릭된다.
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
            if (quillRef.current) {
              const editor = quillRef.current.getEditor();
              const range = editor.getSelection();
              if (range) {
                editor.insertEmbed(range.index, 'image', imgUrl);
              } else {
                console.error('range is null');
              }
            } else {
              console.error('quillRef is null');
            }
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Container>
        <Helmet title={`내일은 최저가 | 매거진 수정 | ${id}`} />
        <FlexBox>
          <Button onClick={() => navigate('/magazine')}></Button>
          <Button onClick={() => onSubmitButtonHandler(id!, newTitle, newContent, newMainImage)}>수정</Button>
        </FlexBox>
        <Scroll>
          <DirectionCol>
            <PhotoDiv>
              <PhotoAdd>
                <label>
                  <input style={{ display: 'none' }} onChange={onImageChangeHandler} type='file' accept='image/*' />
                  <AddImageIcon />
                </label>
              </PhotoAdd>
            </PhotoDiv>
            <Title value={newTitle} onChange={onTitleChangeHandler} rows={1} />
            <StyledImage src={previewImage} alt='매거진 이미지' />
            <ReactQuill
              ref={quillRef}
              value={newContent}
              theme='snow'
              onChange={onContentChangeHandler}
              modules={modules}
              style={{ minHeight: '78vh', boxSizing: 'border-box', border: '1px solid #D9D9D9', borderBottom: 'none', marginBottom: '50px' }}
            />
          </DirectionCol>
        </Scroll>
      </Container>
    </>
  );
};

export default MagazineEditingData;
