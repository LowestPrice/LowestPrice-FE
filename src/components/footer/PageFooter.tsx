import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
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
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { useState, useEffect, ButtonHTMLAttributes } from 'react';

interface ButtonStyleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $active?: boolean;
}

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

  const accessToken = Cookies.get('Authorization');

  const handleAlarmButton = () => {
    if (!accessToken) {
      toast.error('로그인 이후 알림목록을 확인하실 수 있습니다❗️');
      navigate('/login');
      return;
    } else {
      navigate('/notification');
    }
  };

  const handleMypageButton = () => {
    if (!accessToken) {
      toast.error('로그인 이후 마이페이지를 확인하실 수 있습니다❗️');
      navigate('/login');
      return;
    } else {
      navigate('/mypage');
    }
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
      <ButtonStyle $active={location.pathname === '/notification'} onClick={handleAlarmButton}>
        {activeIcon === '/notification' ? <ColorBellIcon /> : <BellIcon />}
        <Text>내 알림</Text>
      </ButtonStyle>
      <ButtonStyle $active={location.pathname === '/mypage'} onClick={handleMypageButton}>
        {activeIcon === '/mypage' ? <ColorMyPageIcon /> : <MyPageIcon />}
        <Text>마이페이지</Text>
      </ButtonStyle>
    </FlexBox>
  );
};

export default PageFooter;

export const FlexBox = styled.div`
  width: 23.4375rem;
  height: 4.0625rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 0.0625rem solid grey;
  position: fixed;
  bottom: 0;
  background-color: white;
  /* z-index: 9999; */
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

export const ButtonStyle = styled.button<ButtonStyleProps>`
  background-color: transparent;
  width: 3.25rem;
  height: 3.25rem;
  font-size: 0.6875rem;
  margin-top: 0.625rem;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.$active ? '#00ABF9' : '#6F6F6F')};
`;

export const Text = styled.div`
  font-size: 0.6875rem;
  width: 3rem;
`;
