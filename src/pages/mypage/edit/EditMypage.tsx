import React, { useState } from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import PageFooter from '../../../components/footer/PageFooter';
import { getUserinfo, postUserinfo } from '../../../api/mypage';
import { useQuery, useMutation } from 'react-query';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { useNavigate } from 'react-router';

export default function EditMypage() {
  const { data, status } = useQuery('userInfo', getUserinfo);

  // 상태 관리 ---------------------------------------
  const [name, setName] = useState<string | undefined>(data.nickname);
  const [imageFile, setImageFile]: any = useState();
  const [imageSrc, setImageSrc]: any = useState();

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 네비게이트 ----------------------------------------
  const navigate = useNavigate();

  // 프로필 이미지 수정
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
      };
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const userInfoMutation = useMutation(postUserinfo, {
    onSuccess: () => {
      console.log('mutate 완료');
    },
    onError: () => {
      console.log('mutate 실패');
    },
  });

  return (
    <div>
      <Header>
        <h2>프로필 수정</h2>
      </Header>
      <Wrap>
        <Profile>
          <ProfileImage src={imageSrc} />
          <ImageInput onChange={(e) => onUpload(e)} multiple type='file' accept='image/*' id='profileimage'></ImageInput>
          <EditImageLabel htmlFor='profileimage'>수정</EditImageLabel>
          <EditName onChange={onChangeName} value={name}></EditName>
          <button
            onClick={() => {
              userInfoMutation.mutate(
                { name, imageFile },
                {
                  onSuccess: () => {
                    alert('추가 완료');
                    navigate('/mypage');
                  },
                  onError: (error) => {
                    console.error('마이페이지 수정 에러', error);
                  },
                }
              );
            }}
          >
            수정하기
          </button>
        </Profile>
      </Wrap>
      <PageFooter />
    </div>
  );
}

const Header = styled.div`
  height: 68px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Wrap = styled.div`
  height: 600px;
`;

const Profile = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;

const ImageInput = styled.input`
  display: none;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: rgba(217, 217, 217, 1);
  object-fit: cover;
`;

const EditImageLabel = styled.label`
  position: absolute;
  opacity: 0;
  width: 110px;
  height: 110px;
  border-radius: 60px;
`;

const EditName = styled.input`
  width: 155px;
  height: 40px;
  border-radius: 7px;
  margin-top: 60px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  color: black;
`;
