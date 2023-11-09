import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Product } from '../../type';

import Alarmbell from '../../assets/icon/Alarmbell';

interface Props extends Product {
  key: number;
}

function SearchProduct(props: Props) {
  const navigate = useNavigate();

  const currentPrice = props.currentPrice.toLocaleString();
  const originalPrice = props.originalPrice.toLocaleString();

  return (
    <Wrap
      onClick={() => {
        navigate(`/detail/${props.productId}`);
      }}
    >
      <SProductImage src={props.productImage} />
      <AlarmWrap
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Alarmbell productId={props.productId} isAlertOn={props.isAlertOn} />
      </AlarmWrap>
      <SProductContent>
        <div className='productName'>{props.productName}</div>
        {props.discountRate !== 0 ? <div className='originalPrice'>{originalPrice}</div> : <div style={{ marginTop: '10px' }}></div>}
        <SProductDiscountWrap>
          <div className='currentPrice'>{currentPrice}원</div>
          {props.discountRate !== 0 ? (
            <SProductDisount>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7' fill='none'>
                  <path
                    d='M4.256 6.67159C4.65334 7.11401 5.34666 7.11401 5.744 6.67159L9.56398 2.41818C10.1421 1.77442 9.68526 0.75 8.81998 0.75H1.18001C0.31474 0.75 -0.142143 1.77442 0.436019 2.41818L4.256 6.67159Z'
                    fill='#137FFF'
                  />
                </svg>
              </div>
              <div>{props.discountRate}%</div>
            </SProductDisount>
          ) : (
            <div></div>
          )}
        </SProductDiscountWrap>
      </SProductContent>
    </Wrap>
  );
}

export default SearchProduct;

const Wrap = styled.div`
  width: 10.375rem;
  min-height: 14.375rem;
  /* border: 0.0625rem solid gray; */
  margin-bottom: 30px;
  cursor: pointer;
  position: relative;
`;

const SProductImage = styled.img`
  width: 10.375rem;
  height: 9.5375rem;
  border-radius: 1.25rem;
  background-color: rgba(243, 243, 243, 1);
`;

const SProductContent = styled.div`
  width: 10.24375rem;
  height: 4.35375rem;
  top: 10.02125rem;
  padding: 0.3125rem;
  .productName {
    font-size: 0.875rem;
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .originalPrice {
    font-size: 0.75rem;
    color: rgba(181, 181, 181, 1);
    text-decoration: line-through;
    font-weight: 500;
  }
  .currentPrice {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const SProductDisount = styled.div`
  margin-right: 1.125rem;
  width: 2.625rem;
  height: 0.9375rem;
  border-radius: 0.1875rem;
  background-color: #9ecbff;
  font-size: 0.625rem;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  gap: 0.1875rem;
  text-align: center;
  justify-content: center;
  color: #137fff;
  div {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 10px;
  }
`;

const SProductDiscountWrap = styled.div`
  width: 9.61875rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AlarmWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0.1875rem;
`;
