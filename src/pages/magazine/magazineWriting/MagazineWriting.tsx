import React, { useState, useMemo } from 'react';
import { FlexBox, Button, ContentBox, DirectionCol, PhotoAdd, PhotoDiv, Title, StyledImage } from './styles';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { postMagazine } from '../../../api/magazine';
import PageFooter from '../../../components/footer/PageFooter';
import { BackIcon, AddImageIcon } from '../../../assets/icon/icon';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MagazineWriting: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 데이터 추가하기
  const [title, setTitle] = useState<any>('');
  const [content, setContent] = useState<any>('');
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

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onContentChangeHandler = (value: string): void => {
    setContent(value);
  };

  // 이미지 처리
  const imageHandlerCallback = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.addEventListener('change', imageHandler);
    input.click();
  };

  const imageHandler = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitButtonHandler = (title: any, content: any, image: any) => {
    console.log(image, '메인 이미지');
    console.log(imageHandlerCallback, '콜백 이미지');
    addPosts.mutate(
      { title, content, image },
      {
        onSuccess: () => {
          toast.success('추가되었습니다');
          navigate('/magazine');
        },
        onError: (error) => {
          console.error('매거진 추가 에러', error);
        },
      }
    );
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
        ],
      },
    };
  }, []);

  return (
    <>
      <FlexBox>
        <Button onClick={() => navigate('/magazine')}>
          <BackIcon />
        </Button>
        <Button onClick={() => onSubmitButtonHandler(title, content, image)}>등록</Button>
      </FlexBox>
      <ContentBox>
        <DirectionCol>
          <Title placeholder='제목' onChange={onTitleChangeHandler} value={title} />
          <PhotoDiv>
            <PhotoAdd>
              <label>
                <input style={{ display: 'none' }} onChange={imageHandler} type='file' accept='image/*' />
                <AddImageIcon />
              </label>
            </PhotoAdd>
          </PhotoDiv>
          {previewImage && <StyledImage src={previewImage} alt='매거진 이미지' />}
          <ReactQuill
            theme='snow'
            placeholder='내용을 입력하세요'
            onChange={onContentChangeHandler}
            value={content}
            modules={modules}
            style={{ overflowY: 'auto', minHeight: '50em', boxSizing: 'border-box' }}
            preserveWhitespace
          />
        </DirectionCol>
      </ContentBox>
      <PageFooter />
    </>
  );
};

export default MagazineWriting;
