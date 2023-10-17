import styled from 'styled-components';

export const FlexBox = styled.div`
  width: 375px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px solid grey;
  position: fixed;
  bottom: 0;
  margin-top: 20px;
  background-color: white;
`;

export const ButtonStyle = styled.button`
  background-color: transparent;
  width: 52px;
  height: 52px;
  font-size: 11px;
  margin: 6px 0px 20px 0px;
  border: none;
`;
