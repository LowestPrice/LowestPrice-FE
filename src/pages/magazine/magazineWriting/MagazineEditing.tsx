import React, { useState, useMemo } from 'react';
import { FlexBox, Button, ContentBox, Title, DirectionCol, PhotoAdd, PhotoDiv, StyledImage, styleString } from './styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { putMagazine } from '../../../api/magazine';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AddImageIcon } from '../../../assets/icon/icon';

// const CustomSize = ReactQuill.Quill.import('attributors/style/size');
// CustomSize.whitelist = ['12px', '14px', '16px', '18px', '20px'];
// ReactQuill.Quill.register(CustomSize, true);

const MagazineEditing: React.FC = () => {
  const location = useLocation();
  const magazineData = location.state.props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState(magazineData.title);
  const [newContent, setNewContent] = useState(magazineData.content);
  const [newMainImage, setNewImage] = useState(magazineData.mainImage);
  const [previewImage, setPreviewImage] = useState<string>(magazineData.mainImage);
  const queryClient = useQueryClient();

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTitle = e.target.value;
    setNewTitle(newTitle);
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
          toast.success('수정되었습니다.');
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
      <style dangerouslySetInnerHTML={{ __html: styleString }} />
      <FlexBox>
        <Button onClick={() => navigate('/magazine')}></Button>
        <Button onClick={() => onSubmitButtonHandler(id, newTitle, newContent, newMainImage)}>수정</Button>
      </FlexBox>
      <ContentBox>
        <DirectionCol>
          <PhotoDiv>
            <PhotoAdd>
              <label>
                <input style={{ display: 'none' }} onChange={onImageChangeHandler} type='file' accept='image/*' />
                <AddImageIcon />
              </label>
            </PhotoAdd>
          </PhotoDiv>
          <Title value={newTitle} onChange={onTitleChangeHandler} />
          <StyledImage src={previewImage} alt='매거진 이미지' />
          <ReactQuill
            value={newContent}
            theme='snow'
            onChange={onContentChangeHandler}
            modules={modules}
            style={{ overflowY: 'auto', minHeight: '50em', boxSizing: 'border-box', overflow: 'hidden' }}
          />
        </DirectionCol>
      </ContentBox>
    </>
  );
};

export default MagazineEditing;
