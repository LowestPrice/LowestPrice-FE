import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexBox, ButtonStyle, Text } from './style';
import {
  MyPageIcon,
  BellIcon,
  FooterMagazineIcon,
  HomeIcon,
  ColorMyPageIcon,
  ColorBellIcon,
  ColorFooterMagazineIcon,
  ColorHomeIcon,
} from '../../assets/icon/icon';
import { useLocation } from 'react-router-dom';

const PageFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIcon, setActiveIcon] = useState('');

  useEffect(() => {
    setActiveIcon(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path: any) => {
    navigate(path);
    setActiveIcon(path);
  };

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
