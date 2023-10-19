import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/footer/Footer';

export interface UserInfo {
  userName?: string | undefined;
  image?: string;
}

export default function EditMypage({ userName, image }: UserInfo) {
  // 상태 관리 ---------------------------------------
  const [name, setName] = useState<string | undefined>(userName);
  const [imageSrc, setImageSrc]: any = useState(image);

  // 네비게이트 ----------------------------------------
  // const navigate = useNavigate();

  // 프로필 이미지 수정
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
      };
    }
  };

  const handleSetName = () => {
    setName('');
  };

  useEffect(() => {
    handleSetName();
  }, []);

  return (
    <div>
      <Header>
        <h2>프로필 수정</h2>
      </Header>
      <Wrap>
        <Profile>
          <ProfileImage src={imageSrc} />
          <ImageInput $imageSrc={imageSrc} accept='image/*' multiple type='file' id='profileimage' onChange={(e) => onUpload(e)}></ImageInput>
          <EditImageLabel htmlFor='profileimage'>수정</EditImageLabel>
          <EditName defaultValue={name}></EditName>
        </Profile>
      </Wrap>
      <Footer />
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

const ImageInput = styled.input<{ $imageSrc: string }>`
  display: ${({ $imageSrc }) => ($imageSrc ? 'none' : 'none')};
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
