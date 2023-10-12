import styled from 'styled-components';
import SimilarProduct from './SimilarProduct';

function Detail() {
  return (
    <div>
      <Header>
        <h3>카테고리명</h3>
      </Header>
      <ProductImage></ProductImage>
      <Content>
        <div className='title'>Apple 정품 2022 아이패드 프로 11 4세대 M2칩</div>
        <div className='existingPrice'>000,000원</div>
        <div className='price'>
          0,000,000원 <span>00%</span>
        </div>
      </Content>
      <SimilarProuctWrap>
        <div className='title'>해당 상품과 비슷한 상품</div>
        <SimilarProductList>
          <SimilarProduct />
          <SimilarProduct />
          <SimilarProduct />
          <SimilarProduct />
          <SimilarProduct />
        </SimilarProductList>
      </SimilarProuctWrap>
    </div>
  );
}

export default Detail;

const Header = styled.div`
  height: 68px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ProductImage = styled.div`
  width: 375px;
  height: 350px;
  background-color: rgba(217, 217, 217, 1);
`;

const Content = styled.div`
  width: 375px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  .title {
    width: 335px;
    height: 50px;
    font-size: 19px;
    font-weight: 600;
  }
  .existingPrice {
    width: 335px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(217, 217, 217, 1);
  }
  .price {
    width: 335px;
    font-size: 22px;
    font-weight: 700;
    color: rgba(0, 0, 0, 1);
    margin-top: -10px;
  }
`;

const SimilarProuctWrap = styled.div`
  width: 546.35px;
  height: 195px;
  gap: 14px;
  .title {
    width: 179px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const SimilarProductList = styled.div`
  width: 375px;
  height: 185px;
  margin-top: 14px;
  display: flex;
  flex-direction: row;
  gap: 15px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 10%; /* 스크롤바의 길이 */
    height: 5px;
    background: rgba(181, 181, 181, 1);
    border-radius: 10px;
  }
`;
