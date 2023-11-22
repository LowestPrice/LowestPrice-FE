import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { getUserinfo, postUserinfo } from '../../../api/mypage';
import { DeleteIdWithKakao } from '../../../api/login';

import PageFooter from '../../../components/footer/PageFooter';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import HelmetTag from '../../../components/HelmetTag';

export default function EditMypage() {
  // 유저정보 가져오기  ------------------------------------------------------

  const { data, status } = useQuery('userInfo', getUserinfo);
  const queryClient = useQueryClient();

  // 이름, 전화번호, 프로필사진 상태 관리 -------------------------------------

  const [name, setName] = useState<string>(data.nickname);
  const [phoneNumber, setPhoneNumber] = useState<string>(data.phone);
  const [imageFile, setImageFile] = useState<File>(data.image);
  const [imageSrc, setImageSrc] = useState(data.image);

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 네비게이트 ---------------------------------------------------------------

  const navigate = useNavigate();

  // 프로필 이미지 수정 --------------------------------------------------------

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

  // 프로필 이름 수정 -----------------------------------------------------------

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const userInfoMutation = useMutation(postUserinfo, {
    onSuccess: () => {
      console.log('mutate 완료');
    },
    onError: () => {
      console.log('mutate 실패');
    },
  });

  // 회원 탈퇴
  const deleteId = useMutation(DeleteIdWithKakao, {
    onSuccess: () => {
      queryClient.invalidateQueries('KakaoId');
    },
    onError: (error) => {
      console.log('error 발생', error);
    },
  });

  const onDeleteButtonHandler = () => {
    deleteId.mutate();
    alert('탈퇴되었습니다.');
    navigate('/');
  };

  return (
    <div style={{ width: '100%' }}>
      <HelmetTag
        title='내일은 최저가 | 마이페이지 수정'
        keywords='내일은 최저가 | 마이페이지 수정'
        description='쿠팡에서 스크래핑해 온 데이터로 만든 Apple 제품 검색 웹사이트입니다.'
        url='https://lowest-price.store/'
      />
      <Header>
        <h2>프로필 수정</h2>
        <CompleteButton
          onClick={() => {
            userInfoMutation.mutate(
              { name, imageFile, phoneNumber },
              {
                onSuccess: () => {
                  toast.success('수정되었습니다✅');
                  navigate('/mypage');
                },
                onError: (error) => {
                  console.error('마이페이지 수정 에러', error);
                },
              }
            );
          }}
        >
          완료
        </CompleteButton>
      </Header>
      <Wrap>
        <Profile>
          <ProfileImage src={imageSrc} />
          <ImageInput onChange={(e) => onUpload(e)} multiple type='file' accept='image/*' id='profileimage'></ImageInput>
          <EditImageLabel htmlFor='profileimage'>수정</EditImageLabel>
          <EditName onChange={onChangeName} value={name}></EditName>
          <EditPhoneNumber onChange={onChangePhoneNumber} value={phoneNumber}></EditPhoneNumber>
          <Withdrawal onClick={onDeleteButtonHandler}>회원탈퇴</Withdrawal>
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
  position: relative;
`;

const CompleteButton = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
  position: absolute;
  right: 12px;
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
  top: 176px;
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

const EditPhoneNumber = styled.input`
  width: 155px;
  height: 40px;
  border-radius: 7px;
  margin-top: 10px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
  color: black;
`;

const Withdrawal = styled.div`
  color: var(--gray02, #b5b5b5);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 17.6px */
  text-decoration-line: underline;
  position: absolute;
  bottom: 210px;
  cursor: pointer;
`;
