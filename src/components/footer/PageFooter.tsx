import { useNavigate } from 'react-router-dom';
import { FlexBox, ButtonStyle, Text } from './style';
import { MyPageIcon, BellIcon, FooterMagazineIcon, HomeIcon } from '../../assets/icon/icon';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const PageFooter = () => {
  const navigate = useNavigate();

  const accessToken = Cookies.get('Authorization');

  const handleAlarmButton = () => {
    if (!accessToken) {
      toast.error('로그인 이후 알림목록을 확인하실 수 있습니다.');
      navigate('/yetlogin');
      return;
    } else {
      navigate('/notification');
    }
  };

  const handleMypageButton = () => {
    if (!accessToken) {
      toast.error('로그인 이후 마이페이지를 확인하실 수 있습니다.');
      navigate('/yetlogin');
      return;
    } else {
      navigate('/mypage');
    }
  };

  return (
    <FlexBox>
      <ButtonStyle onClick={() => navigate('/')}>
        <HomeIcon></HomeIcon>
        <Text>홈</Text>
      </ButtonStyle>
      <ButtonStyle onClick={() => navigate('/magazine')}>
        <FooterMagazineIcon></FooterMagazineIcon>
        <Text>매거진</Text>
      </ButtonStyle>
      <ButtonStyle onClick={handleAlarmButton}>
        <BellIcon></BellIcon>
        <Text>내 알림</Text>
      </ButtonStyle>
      <ButtonStyle onClick={handleMypageButton}>
        <MyPageIcon></MyPageIcon>
        <Text>마이페이지</Text>
      </ButtonStyle>
    </FlexBox>
  );
};

export default PageFooter;
