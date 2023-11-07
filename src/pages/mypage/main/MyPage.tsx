import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';

import { getUserinfo } from '../../../api/mypage';
import { postLogout } from '../../../api/login';

import PageFooter from '../../../components/footer/PageFooter';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

import { MypageEditIcon, RightBackIcon } from '../../../assets/icon/icon';
import RecentProducts from '../../../components/modal/RecentProducts';
import { useState } from 'react';

function Mypage() {
  // 네비게이트 ----------------------------------------

  const navigate = useNavigate();

  // 상태관리 ----------------------------------------
  const [modal, setModal] = useState(false);

  // 서버로 유저정보 가져오기 -----------------------------------

  const { data, status } = useQuery('userInfo', getUserinfo);

  // 로그아웃하기 -----------------------------------------
  const logoutMutation = useMutation(postLogout, {
    onSuccess: () => {
      console.log('로그아웃 성공');
    },
    onError: () => {
      console.log('로그아웃 실패');
    },
  });

  // 로그아웃--------------------------------------------------------

  const handleLogoutButton = () => {
    logoutMutation.mutate();
  };

  // 최근 본 상품 모달 --------------------------------------------------------

  const toggleModal = () => {
    setModal(!modal);
  };

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  return (
    <div style={{ width: '100%' }}>
      <Header>마이페이지</Header>
      <Scroll>
        <Wrap>
          <Title>
            <Greeting>안녕하세요</Greeting>
            <Name>{data.nickname}님</Name>
          </Title>
          <Profile>
            <ProfileImage src={data.image} />
            <ImageInput $imageSrc={data.image} accept='image/*' multiple type='file' id='profileImg'></ImageInput>
            <EditProfileImage onClick={() => navigate(`/editmypage`)}>
              프로필 수정
              <EditIcon>
                <MypageEditIcon />
              </EditIcon>
            </EditProfileImage>
          </Profile>
          <Article onClick={toggleModal}>
            <Unit>
              최근 본 게시물 <RightBackIcon />
            </Unit>
          </Article>
          {modal && <RecentProducts toggleModal={toggleModal} />}
          <Article onClick={() => navigate('/likemagazine')}>
            <Unit>
              좋아요한 매거진 보기 <RightBackIcon />
            </Unit>
          </Article>
          <Logout onClick={handleLogoutButton}>로그아웃</Logout>
        </Wrap>
      </Scroll>
      <PageFooter />
    </div>
  );
}

export default Mypage;

const Header = styled.div`
  height: 4.25rem;
  border-bottom: 0.0625rem solid rgba(217, 217, 217, 1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: 1.375rem;
  line-height: 110%;
  margin-top: 1.6875rem;
  @media screen and (max-width: 743px) and (min-width: 376px) {
  }
  @media screen and (min-width: 744px) {
    margin-top: 1.0625rem;
  }
`;

const Wrap = styled.div`
  height: 50.5rem;
`;

const Scroll = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 75vh;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    max-height: 80vh;
  }
  @media screen and (min-width: 744px) {
    max-height: 100vh;
  }
`;

const Title = styled.div`
  height: 6.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.25rem;
  line-height: 110%;
  margin-left: 1.375rem;
`;

const Greeting = styled.div`
  color: #000;
  font-style: normal;
  font-weight: 500;
  margin-right: 0.5625rem;
  align-items: center;
`;

const Name = styled.span`
  font-weight: 700;
  font-weight: bold;
  padding: 1.25rem 1.25rem 1.25rem 0;
  align-items: center;
`;

const Profile = styled.div`
  height: 15.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageInput = styled.input<{ $imageSrc: string }>`
  display: ${({ $imageSrc }) => ($imageSrc ? 'none' : 'none')};
`;

const ProfileImage = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 7.5rem;
  background-color: rgba(217, 217, 217, 1);
  object-fit: cover;
`;

const EditProfileImage = styled.div`
  margin-top: 1.25rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-top: 1.25rem;
`;

const EditIcon = styled.div`
  margin-left: 0.5rem;
`;

const Article = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.625rem;
  cursor: pointer;
  border-bottom: 0.0625rem solid rgba(217, 217, 217, 1);
  padding-left: 22px;
`;

const Unit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 1.125rem;
`;

const Logout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--gray02, #b5b5b5);
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  text-decoration-line: underline;
  margin-top: 80px;
  cursor: pointer;
`;
