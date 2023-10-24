import { useNavigate } from 'react-router-dom';
import PageFooter from '../../../components/footer/PageFooter';
import { useQuery } from 'react-query';
import { getUserinfo } from '../../../api/mypage';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import styled from 'styled-components';

function Mypage() {
  // 네비게이트 ----------------------------------------
  const navigate = useNavigate();

  const { data, status } = useQuery('userInfo', getUserinfo);

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  console.log(data);

  return (
    <div>
      <Header>
        <h3>마이페이지</h3>
      </Header>
      <Wrap>
        <Title>안녕하세요 {data.nickname}님</Title>
        <Profile>
          <ProfileImage src={data.image} />
          <ImageInput $imageSrc={data.image} accept='image/*' multiple type='file' id='profileImg'></ImageInput>
          <EditProfileImage onClick={() => navigate(`/editmypage`)}>프로필 수정</EditProfileImage>
        </Profile>
        <Article onClick={() => navigate('/likemagazine')}>좋아요한 매거진 보기</Article>
        <Article onClick={() => navigate('/login')}>로그인하러 가기</Article>
      </Wrap>
      <PageFooter />
    </div>
  );
}

export default Mypage;

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

const Title = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
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
`;

const Article = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
`;
