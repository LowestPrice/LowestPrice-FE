import styled from 'styled-components';

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 22px 0px 22px 0px;
  border-bottom: 1px solid #b1b1b1;
`;

interface ButtonProps {
  'back-color': string;
  width: string | number;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props['back-color']};
  border: none;
  font-size: 20px;
  font-weight: 600;
  width: ${(props) => props['width']};
  height: 24px;
`;

export const ContentBox = styled.div`
  width: 335px;
  height: 527px;
  margin: 0px auto 0px auto;
`;

export const Title = styled.input`
  font-size: 26px;
  font-weight: 500;
  color: #b1b1b1;
  margin-top: 25px;
  padding-bottom: 15px;
  border: none;
  border-bottom: 1px solid #b1b1b1;

  &:focus {
    outline: none;
  }
`;

export const Content = styled.input`
  font-size: 18px;
  font-weight: 500;
  color: #b1b1b1;
  margin-top: 10px;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const DirectionCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PhotoAdd = styled.button`
  width: 24px;
  height: 24px;
  margin-top: 13px;
  background-color: #b1b1b1;
  border: none;
`;

export const PhotoDiv = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #b1b1b1;
`;
