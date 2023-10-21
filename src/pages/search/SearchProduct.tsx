import styled from 'styled-components';
import { Product } from '../../type';
import { BsCaretDownFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

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
      <SProductContent>
        <div className='productName'>{props.productName}</div>
        <div className='originalPrice'>{originalPrice}</div>
        <SProductDiscountWrap>
          <div className='currentPrice'>{currentPrice}원</div>
          <SProductDisount>
            <div>
              <BsCaretDownFill size='15' color='#137FFF' />
            </div>
            <div>{props.discountRate}%</div>
          </SProductDisount>
        </SProductDiscountWrap>
      </SProductContent>
    </Wrap>
  );
}

export default SearchProduct;

const Wrap = styled.div`
  width: 166px;
  min-height: 230px;
  /* border: 1px solid gray; */
  margin-bottom: 15px;
  cursor: pointer;
`;

const SProductImage = styled.img`
  width: 166px;
  height: 152.6px;
  border-radius: 20px;
  background-color: rgba(243, 243, 243, 1);
`;

const SProductContent = styled.div`
  width: 163.9px;
  height: 69.66px;
  top: 160.34px;
  padding: 5px;
  .productName {
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
    font-weight: 500;
  }
  .currentPrice {
    font-size: 16px;
    font-weight: 600;
  }
`;

const SProductDisount = styled.div`
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

const SProductDiscountWrap = styled.div`
  width: 153.9px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
