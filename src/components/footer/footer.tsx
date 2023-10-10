import { FlexBox, ButtonStyle } from './style';

const footer = () => {
  return (
    <FlexBox>
      <ButtonStyle>홈</ButtonStyle>
      <ButtonStyle>매거진</ButtonStyle>
      <ButtonStyle>내 알림</ButtonStyle>
      <ButtonStyle>
        마이
        <br />
        페이지
      </ButtonStyle>
    </FlexBox>
  );
};

export default footer;
