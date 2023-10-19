import { useNavigate } from 'react-router-dom';
import { FlexBox, ButtonStyle, Text } from './style';
import { MyPageIcon, BellIcon, FooterMagazineIcon, HomeIcon } from '../../assets/icon/icon';

const PageFooter = () => {
  const navigate = useNavigate();
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
      <ButtonStyle onClick={() => navigate('/notice')}>
        <BellIcon></BellIcon>
        <Text>내 알림</Text>
      </ButtonStyle>
      <ButtonStyle onClick={() => navigate('/mypage')}>
        <MyPageIcon></MyPageIcon>
        <Text>마이페이지</Text>
      </ButtonStyle>
    </FlexBox>
  );
};

export default PageFooter;
