import styled from 'styled-components';

export const Container = styled.div`
  width: 375px;
  min-height: 100vh;
  margin: 0 auto;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  height: 68px;
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  margin-left: 10px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  width: 100%;
  padding-left: 15px;
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
  padding-left: 15px;
`;

export const Writing = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: right;
  color: #b5b5b5;
  cursor: pointer;
  width: 100%;
  padding-right: 15px;
`;

export const Box = styled.div`
  width: 335px;
  height: 315px;
  margin-top: 3%;
  border: 1px solid black;
  border-radius: 1%;
`;

export const Img = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
  background-color: lightgrey;
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
`;
