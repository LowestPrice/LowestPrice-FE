import styled from 'styled-components';
import { Product } from '../../../../type';
import { BsCaretDownFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface Props extends Product {}

function CategoryOffProduct(props: Props) {
  const navigate = useNavigate();

  const currentPrice = props.currentPrice.toLocaleString();
  const originalPrice = props.originalPrice.toLocaleString();

  return (
    <div>
      <Wrap
        onClick={() => {
          navigate(`/detail/${props.productId}`);
        }}
      >
        <CProductImage>
          <img src={props.productImage}></img>
        </CProductImage>
        <CProductContent>
          <div className='title'>{props.productName}</div>
          <div className='originalPrice'>{originalPrice}원</div>
          <DiscountWrap>
            <div className='currentPrice'>{currentPrice}원</div>
            <DiscountRateWrap>
              <div>
                <BsCaretDownFill size='15' color='#137FFF' />
              </div>
              <div>{props.discountRate}%</div>
            </DiscountRateWrap>
          </DiscountWrap>
        </CProductContent>
      </Wrap>
    </div>
  );
}

export default CategoryOffProduct;
const Wrap = styled.div`
  width: 166px;
  height: 243px;
  /* border: 1px solid gray; */
  margin-bottom: 10px;
  cursor: pointer;
`;

const CProductImage = styled.div`
  width: 166px;
  height: 152.6px;
  border-radius: 20px;
  background-color: rgba(243, 243, 243, 1);
  img {
    width: 100%;
    height: 100%;
  }
`;

const CProductContent = styled.div`
  width: 156.9px;
  height: 69.66px;
  top: 160.34px;
  padding: 5px;
  .title {
    font-size: 14px;
    font-weight: 400;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .originalPrice {
    font-size: 12px;
    color: rgba(181, 181, 181, 1);
    text-decoration: line-through;
  }
  .currentPrice {
    font-size: 16px;
    font-weight: 600;
  }
`;

const DiscountWrap = styled.div`
  width: 153.9px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
