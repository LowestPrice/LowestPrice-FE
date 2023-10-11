import React from 'react';
import styled from 'styled-components';

type Props = {};

function CategoryProduct({}: Props) {
  return (
    <div>
      <Wrap>
        <CProductImage></CProductImage>
        <CProductContent>
          <div className='title'>Apple 정품 2022 아이패드 프로 11 4세대 M2칩...</div>
          <div className='existingPrice'>000,000원</div>
        </CProductContent>
      </Wrap>
    </div>
  );
}

export default CategoryProduct;
const Wrap = styled.div`
  width: 166px;
  height: 230px;
  border: 1px solid gray;
  margin-bottom: 10px;
`;

const CProductImage = styled.div`
  width: 166px;
  height: 152.6px;
  border-radius: 20px;
  background-color: rgba(243, 243, 243, 1);
`;

const CProductContent = styled.div`
  width: 163.9px;
  height: 69.66px;
  top: 160.34px;
  padding: 5px;
  .title {
    font-size: 14px;
    font-weight: bold;
  }
  .existingPrice {
    font-size: 12px;
    color: rgba(181, 181, 181, 1);
  }
`;
