import { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import NProductList from './NProductList/NProductList';
import NPriceAlarmList from './NPriceAlarmList/NPriceAlarmList';
import PageFooter from '../../components/footer/PageFooter';
import { Helmet } from 'react-helmet-async';

type Props = {};

export default function Notification({}: Props) {
  const [tab, setTab] = useState<boolean>(true);

  // 알림상품목록 ------------------------------------

  const switchProductTab = (): void => {
    setTab(true);
  };

  // 알림 글 목록 ------------------------------------

  const switchPriceTab = (): void => {
    toast.error('죄송합니다. 해당 정보는 개발중에 있습니다. 조금만 기다려주시면 감사하겠습니다.😂');
    // setTab(false);
  };

  return (
    <Wrap>
      <Helmet title='내일은 최저가 | 알림' />

      <Header>
        <MyNotification>내 알림</MyNotification>
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
      <PageFooter />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  height: 68px;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }
`;

const MyNotification = styled.div`
  color: #000;
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%;
`;

const Navigate = styled.div`
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
