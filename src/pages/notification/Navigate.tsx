import styled from 'styled-components';

type Props = {};

function Navigate({}: Props) {
  return <div>Navigate</div>;
}

export default Navigate;

const NavigateWrap = styled.div`
  height: 62px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
`;

const ProductList = styled.div<{ $tab: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-bottom: ${({ $tab }) => ($tab ? ' 2px solid black' : 'none')};
  font-style: normal;
  font-weight: 700;
  line-height: 110%;
`;

const PriceAlarmList = styled.div<{ $tab: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-bottom: ${({ $tab }) => (!$tab ? ' 2px solid black' : 'none')};
  color: #000;
  font-style: normal;
  font-weight: 700;
  line-height: 110%;
`;
