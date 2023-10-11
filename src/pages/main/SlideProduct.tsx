import React from 'react';
import styled from 'styled-components';

type Props = {};

function SlideProduct({}: Props) {
  return (
    <div>
      <Wrap>
        <div className='rank'>1</div>
        <Content>
          <div>
            <span className='discount'>00%</span>
            <span className='price'>000,000원</span>
            <span className='existingPrice'>000,000원</span>
          </div>
          <div className='title'>Apple 정품 2022 아애패드 프로 11 4세대 M2칩</div>
        </Content>
      </Wrap>
    </div>
  );
}

export default SlideProduct;

const Wrap = styled.div`
  width: 271px;
  height: 318px;
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
    color: rgba(255, 255, 255, 1);
    line-height: 58, 51px;
    position: absolute;
    left: 16px;
  }
`;

const Content = styled.div`
  width: 250.09px;
  height: 71.97px;
  position: absolute;
  bottom: 10px;
  left: 12px;
  color: rgba(255, 255, 255, 1);
  div {
    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 10px;
  }

  .discount {
    font-size: 20.99px;
    font-weight: bold;
  }
  .price {
    font-size: 19.24px;
    font-weight: bold;
  }
  .existingPrice {
    font-size: 12.24px;
    font-weight: bold;
  }
  .title {
    font-size: 13.99px;
    font-weight: 500;
  }
`;
