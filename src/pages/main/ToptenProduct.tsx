import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  productName: string;
  currentPrice: number;
  discountRate: number;
  productImage: string;
  originalPrice: string;
  index: number;
  productId: number;
};

function ToptenProduct(props: Props) {
  const navigate = useNavigate();
  const currentPrice = props.currentPrice.toLocaleString();
  const originalPrice = props.originalPrice.toLocaleString();

  return (
    <Wrap
      onClick={() => {
        navigate(`/detail/${props.productId}`);
      }}
    >
      <ProductImageWrap />
      <div className='rank'>{props.index + 1}</div>
      <Content>
        <div>
          <span className='discountRate'>{props.discountRate}%</span>
          <span className='price'>{currentPrice}원</span>
          <span className='originalPrice'>{originalPrice}원</span>
        </div>
        <div className='title'>{props.productName}</div>
      </Content>
      <img
        src={props.productImage}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '15px',
          zIndex: '-1',
          position: 'absolute',
          top: '0px',
        }}
      ></img>
    </Wrap>
  );
}

export default ToptenProduct;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180.08deg,
    rgba(255, 255, 255, 0) 34.86%,
    rgba(148, 148, 148, 0.04) 53.24%,
    rgba(139, 139, 139, 0.17) 65.15%,
    rgba(120, 120, 120, 0.33) 71.61%,
    rgba(107, 107, 107, 0.62) 80.8%,
    #4d4d4d 100.2%
  );
  background-color: rgba(243, 243, 243, 1);
  border-radius: 15px;
  position: relative;
  .rank {
    font-size: 53.19px;
    color: black;
    line-height: 58, 51px;
    position: absolute;
    left: 16px;
    top: 0px;
  }
  z-index: 10;
`;

const ProductImageWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(243, 243, 243, 1);
  background: linear-gradient(
    180.08deg,
    rgba(255, 255, 255, 0) 34.86%,
    rgba(148, 148, 148, 0.04) 53.24%,
    rgba(139, 139, 139, 0.17) 65.15%,
    rgba(120, 120, 120, 0.33) 71.61%,
    rgba(107, 107, 107, 0.62) 80.8%,
    #4d4d4d 100.2%
  );
  border-radius: 15px;
`;

const Content = styled.div`
  width: 250.09px;
  height: 71.97px;
  position: absolute;
  bottom: -3px;
  left: 14px;
  color: rgba(255, 255, 255, 1);
  div {
    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 10px;
  }

  .discountRate {
    font-size: 20.99px;
    font-weight: bold;
  }
  .price {
    font-size: 19.24px;
    font-weight: bold;
    margin-left: 5px;
  }
  .originalPrice {
    font-size: 12.24px;
    font-weight: bold;
    margin-left: 7px;
    text-decoration: line-through;
  }
  .title {
    width: 240px;
    font-size: 13.99px;
    font-weight: 500;
  }
`;
