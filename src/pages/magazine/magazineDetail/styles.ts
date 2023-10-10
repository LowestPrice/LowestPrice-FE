import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto 0 auto;
`;

export const TopBox = styled.div`
  height: 304px;
  background-color: lightgrey;
  position: relative;
`;

export const InfoBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  padding-bottom: 10px;
`;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 500;
  margin-left: 20px;
`;

export const Editor = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-left: 20px;
`;

export const TextArea = styled.div`
  width: 335px;
  height: 344px;
  margin: 20px;
  background-color: #f3f3f3;
`;

export const ContentButton = styled.button`
  width: 375px;
  height: 125px;
  background-color: ligthgrey;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ContentTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-left: 20px;
`;

export const ContentEditor = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  margin: 0px 0px 20px 20px;
`;

export const MagazineTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 22px 0px 22px 0px;
  font-size: 12px;
  font-weight: 300;
`;
