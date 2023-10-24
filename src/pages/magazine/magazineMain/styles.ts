import styled from 'styled-components';

export const Container = styled.div`
  width: 375px;
  min-height: 100vh;
  margin: 0 auto;
  padding-bottom: 82px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f3f3;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 26px 274px 18px 20px;
`;

export const LogoTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  line-height: 110%;
  margin-left: 6px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  width: 100%;
  padding-top: 17.82px;
  padding-left: 40px;
  line-height: 100%;
`;

export const Line = styled.div`
  border-top: 1px solid grey;
`;

export const Subtitle = styled.div`
  font-size: 14px;
  color: grey;
  margin-top: 1%;
  font-weight: 600;
  text-align: left;
  width: 100%;
  margin-left: 40px;
`;

export const Writing = styled.div`
  width: 323px;
  font-size: 18px;
  font-weight: 600;
  color: #b5b5b5;
  cursor: pointer;
  width: 100%;
  margin-right: 56px;
  margin-bottom: -16px;
  text-align: right;
  line-height: 110%;
  text-decoration-line: underline;
`;

export const Box = styled.div`
  width: 335px;
  height: 315px;
  margin-top: 26px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

export const Img = styled.img`
  width: 335px;
  height: 60%;
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
`;

export const BoxPadding = styled.div`
  padding: 5% 3% 5% 3%;
`;

export const BoxTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const Content = styled.div`
  margin: 1% 0% 1% 0%;
  font-size: 14px;
  font-weight: 400;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
`;

export const LikeFlex = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
`;
