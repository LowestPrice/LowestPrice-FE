import React, { useState } from 'react';
import styled from 'styled-components';
import NProductList from './NProductList/NProductList';
import NPriceAlarmList from './NPriceAlarmList/NPriceAlarmList';

type Props = {};

export default function Notification({}: Props) {
  const [tab, setTab] = useState<boolean>(true);

  const switchProductTab = (): void => {
    setTab(true);
  };

  const switchPriceTab = (): void => {
    setTab(false);
  };

  return (
    <div>
      <Header>
        <h3>내 알림</h3>
      </Header>
      <Navigate>
        <ProductList
          $tab={tab}
          onClick={() => {
            switchProductTab();
          }}
        >
          상품목록
        </ProductList>
        <PriceAlarmList
          $tab={tab}
          onClick={() => {
            switchPriceTab();
          }}
        >
          가격변동알림
        </PriceAlarmList>
      </Navigate>
      {tab ? <NProductList /> : <NPriceAlarmList />}
    </div>
  );
}

const Header = styled.div`
  height: 68px;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;

const Navigate = styled.div`
  height: 62px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
`;

const ProductList = styled.div<{ $tab: boolean }>`
  width: 187.5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-bottom: ${({ $tab }) => ($tab ? ' 2px solid black' : 'none')};
`;

const PriceAlarmList = styled.div<{ $tab: boolean }>`
  width: 187.5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-bottom: ${({ $tab }) => (!$tab ? ' 2px solid black' : 'none')};
`;
