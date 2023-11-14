import styled from 'styled-components';
import { AlarmItem } from './NAlarmList';

interface Props extends AlarmItem {}

function NAralmtItem(props: Props) {
  // 상품 가격 천 단위 콤마 생성하기 -------------------------------

  const currentPrice = props.currentPrice.toLocaleString();
  const originalPrice = props.originalPrice.toLocaleString();

  // 할인된 가격

  const DiscountedAmount = (props.originalPrice - props.currentPrice).toLocaleString();

  // 할인된 날짜

  const date = props.createdAt ? `${props.createdAt.substr(5, 2)}월 ${props.createdAt.substr(8, 2)}일` : '';

  // 화면 ===================================================================================================

  return (
    <Wrap>
      <NPriceItem>
        <div className='date'>{date}</div>
        <NPriceContent style={{ display: 'flex', flexDirection: 'row' }}>
          <NPriceimg src={props.productImage} />
          <NPriceInfo>
            <div className='title'>{props.productName}</div>
            <div className='option'>{props.productOption}</div>
            <PriceContent>
              <span className='originalPrice'>{originalPrice}원</span>
              &gt;
              <span className='currentPrice'>{currentPrice}원</span>
              <span className='DiscountedAmount'>(-{DiscountedAmount})</span>
            </PriceContent>
          </NPriceInfo>
        </NPriceContent>
      </NPriceItem>
    </Wrap>
  );
}

export default NAralmtItem;

const Wrap = styled.div`
  width: 100%;
  height: 126px;
  padding: 18px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  padding-bottom: 0px;
`;

const NPriceItem = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .date {
    color: var(--gray03, #6f6f6f);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 111.5%; /* 15.61px */
  }
`;

const NPriceContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 68px;
`;

const NPriceimg = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 7px;
  background-color: rgba(217, 217, 217, 1);
  margin-right: 6px;
`;

const NPriceInfo = styled.div`
  height: 63px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    font-size: 14px;
    font-weight: bold;
  }
  .option {
    font-size: 12px;
    color: rgba(111, 111, 111, 1);
  }
  @media screen and (max-width: 450px) {
    width: 290px;
  }
`;

const PriceContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  .originalPrice {
    color: var(--gray03, #6f6f6f);
    font-size: 14px;
    font-weight: 500;
    text-decoration: line-through;
  }
  .currentPrice {
    color: var(--black, #000);
    text-align: right;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 110%; /* 17.6px */
  }
  .DiscountedAmount {
    color: var(--d-9-d-9-d-9, #458fff);
    text-align: right;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%; /* 11px */
    margin-left: -5px;
  }
`;
