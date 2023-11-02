import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getUserinfo } from '../../../api/mypage';
// import { postlogout } from '../../../api/login';

import PageFooter from '../../../components/footer/PageFooter';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

import Cookies from 'js-cookie';
import { MypageEditIcon, RightBackIcon } from '../../../assets/icon/icon';

function Mypage() {
  // 네비게이트 ----------------------------------------

  const navigate = useNavigate();

  // 서버로 유저정보 가져오기 -----------------------------------

  const { data, status } = useQuery('userInfo', getUserinfo);

  // 로그아웃하기 -----------------------------------------
  // const logoutMutation = useMutation(postlogout, {
  //   onSuccess: () => {
  //     console.log('로그아웃 성공');
  //   },
  //   onError: () => {
  //     console.log('로그아웃 실패');
  //   },
  // });

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 로그아웃--------------------------------------------------------

  const handleLogoutButton = () => {
    // logoutMutation.mutate();
    Cookies.remove('Authorization');
    navigate('/');
  };

  const accessToken = Cookies.get('Authorization');

  return (
    <div>
      <Header>마이페이지</Header>
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

        <Article onClick={() => navigate('/likemagazine')}>
          <Like>
            좋아요한 매거진 보기 <RightBackIcon />
          </Like>
        </Article>
        {accessToken ? <Article onClick={handleLogoutButton}>로그아웃</Article> : <Article onClick={() => navigate('/login')}>로그인하러 가기</Article>}
      </Wrap>
      <PageFooter />
    </div>
  );
}

export default Mypage;

const Header = styled.div`
  height: 68px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: 22px;
  line-height: 110%;
  margin-top: 27px;
  margin-bottom: 17px;
`;

const Wrap = styled.div`
  height: 600px;
`;

const Title = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  line-height: 110%;
  margin-left: 22px;
`;

const Greeting = styled.div`
  color: #000;
  font-style: normal;
  font-weight: 500;
  margin-right: 9px;
  align-items: center;
`;

const Name = styled.span`
  font-weight: 700;
  font-weight: bold;
  padding: 20px 20px 20px 0px;
  align-items: center;
`;

const Profile = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageInput = styled.input<{ $imageSrc: string }>`
  display: ${({ $imageSrc }) => ($imageSrc ? 'none' : 'none')};
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 120px;
  background-color: rgba(217, 217, 217, 1);
  object-fit: cover;
`;

const EditProfileImage = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const EditIcon = styled.div`
  margin-left: 8px;
`;

const Article = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  padding-left: 22px;
`;

const Like = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 18px;
`;
