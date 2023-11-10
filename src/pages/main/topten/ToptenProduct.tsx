import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Product } from '../../../type';

import Alarmbell from '../../../assets/icon/Alarmbell';
import getParametersForUnsplash from '../../../optimization/imgcdn';

interface Props extends Product {
  index: number;
}

function ToptenProduct(props: Props) {
  const navigate = useNavigate();

  // 상품 가격 천 단위 콤마 생성하기 -------------------------------

  const currentPrice = props.currentPrice.toLocaleString();
  const originalPrice = props.originalPrice.toLocaleString();

  return (
    <Wrap
      onClick={() => {
        navigate(`/detail/${props.productId}`);
      }}
    >
      <ProductImageWrap />
      <BellImage
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Alarmbell productId={props.productId} isAlertOn={props.isAlertOn} isOutOfStock={props.isOutOfStock} />
      </BellImage>
      <div className='rank'>{props.index + 1}</div>
      <Content>
        <div>
          <span className='discountRate'>{props.discountRate}%</span>
          <span className='price'>{currentPrice}원</span>
          <span className='originalPrice'>{originalPrice}원</span>
        </div>
        <div className='title'>{props.productName}</div>
      </Content>
      <ImageWrap>
        <ProductImage src={props.productImage + getParametersForUnsplash(257.997, 257.997, 80, 'jpg')} />
      </ImageWrap>
    </Wrap>
  );
}

export default ToptenProduct;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(243, 243, 243, 1);
  border-radius: 15px;
  position: relative;
  .rank {
    font-size: 53.19px;
    font-weight: 700;
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
  background-color: #f3f3f3;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0.24%, rgba(0, 0, 0, 0.4) 3.99%, rgba(0, 0, 0, 0.4) 7.05%, rgba(0, 0, 0, 0.04) 32.56%);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BellImage = styled.div`
  width: 39.19px;
  height: 39.19px;
  z-index: 10;
  position: absolute;
  right: 10px;
  top: 10px;
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
    color: #fa6161;
    font-size: 20.99px;
    font-weight: 700;
  }
  .price {
    font-size: 19.24px;
    font-weight: 700;
    margin-left: 5px;
  }
  .originalPrice {
    font-size: 11.361px;
    font-weight: 700;
    margin-left: 2px;
    text-decoration: line-through;
  }
  .title {
    width: 240px;
    font-size: 13.99px;
    font-weight: 500;
    margin-top: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const ProductImage = styled.img`
  width: 88%;
  height: 85%;
  border-radius: 15px;
  margin-top: 10px;
`;

const ImageWrap = styled.div`
  width: 258px;
  height: 258px;
  background-color: white;
  position: absolute;
  top: 0px;
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
