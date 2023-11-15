import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Product } from '../../../type';

interface Props extends Product {}

function SimilarProduct(props: Props) {
  const navigate = useNavigate();

  // 상품 가격 천 단위 콤마 생성하기 -------------------------------
  const currentPrice = props.currentPrice.toLocaleString();
  const originalPrice = props.originalPrice.toLocaleString();

  // 화면 =============================================================
  
  return (
    <div>
      <Wrap
        onClick={() => {
          navigate(`/detail/${props.productId}`);
        }}
      >
        <div style={{ position: 'relative' }}>
          <SimilarProductImage src={props.productImage} />
          {props.isOutOfStock ? (
            <SoldoutWrap>
              <div>Sold Out</div>
            </SoldoutWrap>
          ) : (
            <div></div>
          )}
        </div>
        <SimilarProductContent>
          <div className='Stitle'>{props.productName}</div>
          {props.discountRate !== 0 ? <div className='SexistingPrice'>{originalPrice}원</div> : <div style={{ height: '0.6875rem' }}></div>}
          <SimilarProductPriceWrap>
            <div className='Sprice'>{currentPrice}원</div>
            {props.discountRate !== 0 ? (
              <DiscountRateWrap>
                <div>
                  <svg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7' fill='none'>
                    <path
                      d='M4.256 6.67159C4.65334 7.11401 5.34666 7.11401 5.744 6.67159L9.56398 2.41818C10.1421 1.77442 9.68526 0.75 8.81998 0.75H1.18001C0.31474 0.75 -0.142143 1.77442 0.436019 2.41818L4.256 6.67159Z'
                      fill='#137FFF'
                    />
                  </svg>
                </div>
                <div style={{ fontSize: '10px' }}>{props.discountRate}%</div>
              </DiscountRateWrap>
            ) : (
              <div></div>
            )}
          </SimilarProductPriceWrap>
        </SimilarProductContent>
      </Wrap>
    </div>
  );
}

export default SimilarProduct;

const Wrap = styled.div`
  width: 7.83375rem;
  height: 10.3125rem;
  cursor: pointer;
`;

const SimilarProductImage = styled.img`
  width: 7.83375rem;
  height: 6.841875rem;
  border-radius: 0.991875rem;
  border: none;
  background-color: white;
  object-fit: contain;
`;

const SimilarProductContent = styled.div`
  width: 7.734375rem;
  height: 3.12375rem;
  .Stitle {
    width: 7.734375rem;
    height: 1.7rem;
    font-size: 0.694375rem;
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .SexistingPrice {
    width: 4.4125rem;
    font-size: 0.595rem;
    font-weight: 500;
    color: rgba(181, 181, 181, 1);
    text-decoration: line-through;
  }
  .Sprice {
    width: 6.51625rem;
    height: 0.875rem;
    font-size: 0.793125rem;
    font-weight: 600;
  }
  .discountRate {
    width: 2.03rem;
    height: 0.725rem;
    padding: 0.099375rem;
    margin-left: 0.3125rem;
    background-color: #9ecbff;
    font-size: 0.495625rem;
    font-weight: 500;
    color: #0c77f6;
    border-radius: 0.145rem;
  }
`;

const SimilarProductPriceWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const DiscountRateWrap = styled.div`
  margin-right: 0.125rem;
  width: 3.1875rem;
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
  }
`;

const SoldoutWrap = styled.div`
  position: absolute;
  top: -2px;
  left: 8px;
  opacity: 50%;
  width: 90%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), lightgray 50% / cover no-repeat;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    color: white;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%; /* 22px */
    opacity: 100;
  }
`;
