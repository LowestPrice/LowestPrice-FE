import React, { useState, useMemo } from 'react';
import { FlexBox, Button, Title, DirectionCol, PhotoAdd, PhotoDiv, StyledImage, styleString, Container, Scroll } from '../../styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { putMagazine } from '../../../../../api/magazine';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AddImageIcon } from '../../../../../assets/icon/icon';
import { Helmet } from 'react-helmet-async';

const MagazineEditingData = () => {
  const location = useLocation();
  const magazineData = location.state.props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState(magazineData.title);
  const [newContent, setNewContent] = useState(magazineData.content);
  const [newMainImage, setNewImage] = useState(magazineData.mainImage);
  const [previewImage, setPreviewImage] = useState<string>(magazineData.mainImage);
  const queryClient = useQueryClient();

  // const CustomSize = ReactQuill.Quill.import('attributors/style/size');
  // CustomSize.whitelist = ['12px', '14px', '16px', '18px', '20px'];
  // ReactQuill.Quill.register(CustomSize, true);

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

  const onSubmitButtonHandler = (id: any, newTitle: string, newContent: string, newMainImage: File) => {
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
      <Container>
        <Helmet title={`내일은 최저가 | 매거진 수정 | ${id}`} />
        <style dangerouslySetInnerHTML={{ __html: styleString }} />
        <FlexBox>
          <Button onClick={() => navigate('/magazine')}></Button>
          <Button onClick={() => onSubmitButtonHandler(id, newTitle, newContent, newMainImage)}>수정</Button>
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
              value={newContent}
              theme='snow'
              onChange={onContentChangeHandler}
              modules={modules}
              style={{ overflowY: 'hidden', minHeight: '78vh', boxSizing: 'border-box', overflow: 'hidden', border: '1px solid #D9D9D9' }}
            />
          </DirectionCol>
        </Scroll>
      </Container>
    </>
  );
};

export default MagazineEditingData;
