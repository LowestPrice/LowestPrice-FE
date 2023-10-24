import { useNavigate } from 'react-router-dom';
import { FlexBox, ButtonStyle, Text } from './style';
import { MyPageIcon, BellIcon, FooterMagazineIcon, HomeIcon } from '../../assets/icon/icon';

const PageFooter = () => {
  const navigate = useNavigate();

  return (
    <FlexBox>
      <ButtonStyle $active={location.pathname === '/'} onClick={() => handleNavigation('/')}>
        {activeIcon === '/' ? <ColorHomeIcon /> : <HomeIcon />}
        <Text>홈</Text>
      </ButtonStyle>
      <ButtonStyle $active={location.pathname === '/magazine'} onClick={() => handleNavigation('/magazine')}>
        {activeIcon === '/magazine' ? <ColorFooterMagazineIcon /> : <FooterMagazineIcon />}
        <Text>매거진</Text>
      </ButtonStyle>
      <ButtonStyle $active={location.pathname === '/notice'} onClick={() => handleNavigation('/notice')}>
        {activeIcon === '/notice' ? <ColorBellIcon /> : <BellIcon />}
        <Text>내 알림</Text>
      </ButtonStyle>
      <ButtonStyle $active={location.pathname === '/mypage'} onClick={() => handleNavigation('/mypage')}>
        {activeIcon === '/mypage' ? <ColorMyPageIcon /> : <MyPageIcon />}
        <Text>마이페이지</Text>
      </ButtonStyle>
    </FlexBox>
  );
};

export default PageFooter;
