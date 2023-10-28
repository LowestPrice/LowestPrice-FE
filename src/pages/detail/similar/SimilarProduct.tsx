import styled from 'styled-components';
import { Product } from '../../../type';

interface Props extends Product {}

function SimilarProduct(props: Props) {
  // 상품 가격 천 단위 콤마 생성하기 -------------------------------

  const currentPrice = props.currentPrice.toLocaleString();
  const originalPrice = props.originalPrice.toLocaleString();
  return (
    <div>
      <Wrap>
        <SimilarProductImage src={props.productImage} />
        <SimilarProductContent>
          <div className='Stitle'>{props.productName}</div>
          <div className='SexistingPrice'>{currentPrice}원</div>
          <SimilarProductPriceWrap>
            <div className='Sprice'>{originalPrice}원</div>
            <DiscountRateWrap>
              <div>
                <svg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7' fill='none'>
                  <path
                    d='M4.256 6.67159C4.65334 7.11401 5.34666 7.11401 5.744 6.67159L9.56398 2.41818C10.1421 1.77442 9.68526 0.75 8.81998 0.75H1.18001C0.31474 0.75 -0.142143 1.77442 0.436019 2.41818L4.256 6.67159Z'
                    fill='#137FFF'
                  />
                </svg>
              </div>
              <div>{props.discountRate}%</div>
            </DiscountRateWrap>
          </SimilarProductPriceWrap>
        </SimilarProductContent>
      </Wrap>
    </div>
  );
}

export default SimilarProduct;

const Wrap = styled.div`
  width: 125.34px;
  height: 165px;
`;

const SimilarProductImage = styled.img`
  width: 125.34px;
  height: 109.47px;
  border-radius: 15.87px;
  border: none;
  background-color: rgba(243, 243, 243, 1);
`;

const SimilarProductContent = styled.div`
  width: 123.75px;
  height: 49.98px;
  .Stitle {
    width: 123.75px;
    height: 28.38px;
    font-size: 11.11px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .SexistingPrice {
    width: 70.6px;
    font-size: 9.52px;
    font-weight: 500;
    color: rgba(181, 181, 181, 1);
    text-decoration: line-through;
  }
  .Sprice {
    width: 104.26px;
    height: 14px;
    font-size: 12.69px;
    font-weight: 600;
  }
  .discountRate {
    width: 32.48px;
    height: 11.6px;
    padding: 1.59px;
    margin-left: 5px;
    background-color: #9ecbff;
    font-size: 7.93px;
    font-weight: 500;
    color: #0c77f6;
    border-radius: 2.32px;
  }
`;

const SimilarProductPriceWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const DiscountRateWrap = styled.div`
  margin-right: 18px;
  width: 42px;
  height: 15px;
  border-radius: 3px;
  background-color: #9ecbff;
  font-size: 10px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  gap: 3px;
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
