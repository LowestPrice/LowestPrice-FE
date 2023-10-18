import { useNavigate } from 'react-router-dom';
import { FlexBox } from './style';

import styled from 'styled-components';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <FlexBox>
      <ButtonStyle onClick={() => navigate('/')}>
        <div style={{ marginLeft: '2px' }}>
        </div>
        <div>홈</div>
      </ButtonStyle>
      <ButtonStyle onClick={() => navigate('/magazine')}>
        <div>매거진</div>
      </ButtonStyle>
      <div style={{ marginTop: '2px' }}>
        <ButtonStyle onClick={() => navigate('/notice')}>
          <div>
          </div>
          <div>내 알림</div>
        </ButtonStyle>
      </div>
      <ButtonStyle onClick={() => navigate('/mypage')}>
        <div style={{ marginLeft: '2px' }}>
        </div>
        <div style={{ width: '51px' }}>마이 페이지</div>
      </ButtonStyle>
    </FlexBox>
  );
};

export default Footer;

export const ButtonStyle = styled.button`
  background-color: transparent;
  width: 52px;
  height: 52px;
  font-size: 11px;
  font-weight: 400;
  margin: 6px 0px 20px 0px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  img {
    width: 24px;
    height: 24px;
  }
`;
