import styled from 'styled-components';

export const FlexBox = styled.div`
  width: 375px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid grey;
  position: fixed;
  bottom: 0;
  margin-top: 20px;
  background-color: white;
  z-index: 1000;
`;
