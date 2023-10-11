import { useNavigate } from 'react-router-dom';
import { FlexBox, ButtonStyle } from './style';

const footer = () => {
  const navigate = useNavigate();
  return (
    <FlexBox>
      <ButtonStyle onClick={() => navigate('/')}>홈</ButtonStyle>
      <ButtonStyle onClick={() => navigate('/magazine')}>매거진</ButtonStyle>
      <ButtonStyle onClick={() => navigate('/notice')}>내 알림</ButtonStyle>
      <ButtonStyle onClick={() => navigate('/mypage')}>
        마이
        <br />
        페이지
      </ButtonStyle>
    </FlexBox>
  );
};

export default footer;
