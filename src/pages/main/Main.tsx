import styled from 'styled-components';
import SlideProduct from './SlideProduct';
import CategoryProduct from './CategoryProduct';

type Props = {};

export default function Main({}: Props) {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', width: '100%' }}>
      <Header>
        <h3>내일은 최저가</h3>
      </Header>
      <Wrap>
        <SearchInput />
        <Title>
          <div className='title'>오늘의 특가</div>
          <div className='subTitle'>할인율이 가장 높은 상품이에요</div>
        </Title>
        <SlideWrap>
          <SlideProduct />
          <SlideProduct />
          <SlideProduct />
        </SlideWrap>
        <CategoryWrap>
          <CategoryTitle>
            <div>Apple 제품</div>
            <div>가장 저렴할 때 구매하세요.</div>
          </CategoryTitle>
          <CategoryTabWrap>
            <CategoryTab>아이패드</CategoryTab>
            <CategoryTab>아이패드</CategoryTab>
            <CategoryTab>아이패드</CategoryTab>
            <CategoryTab>아이패드</CategoryTab>
            <CategoryTab>아이패드</CategoryTab>
          </CategoryTabWrap>
          <Filterbar>
            <Options>
              <div className='filterOption'> 할인순</div>
              <div className='filterOption'> 낮은가격순</div>
              <div className='filterOption'> 높은가격순</div>
            </Options>
          </Filterbar>
          <CategoryProductList>
            <CategoryProduct></CategoryProduct>
            <CategoryProduct></CategoryProduct>
            <CategoryProduct></CategoryProduct>
            <CategoryProduct></CategoryProduct>
            <CategoryProduct></CategoryProduct>
          </CategoryProductList>
        </CategoryWrap>
      </Wrap>
    </div>
  );
}

const Header = styled.div`
  width: 375px;
  height: 62px;
  top: 34px;
  padding: 12px, 51px, 12px, 12px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrap = styled.div`
  width: 375px;
  height: 489.32px;
  background: linear-gradient(180deg, #cdcdcd 0%, rgba(213, 213, 213, 0.915044) 13.02%, rgba(171, 171, 171, 0.36) 58.85%, rgba(171, 171, 171, 0) 79.17%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 335px;
  height: 52px;
  border-radius: 60px;
  margin-top: 20px;
  border: none;
  outline: none;
`;

const Title = styled.div`
  width: 199px;
  height: 50px;
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .subTitle {
    font-size: 14px;
  }
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const SlideWrap = styled.div`
  min-width: 807px;
  height: 318px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

const CategoryWrap = styled.div`
  width: 374px;
  min-height: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CategoryTitle = styled.div`
  width: 315px;
  height: 70px;
  padding: 10px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
  gap: 22px;
`;

const CategoryTabWrap = styled.div`
  width: 375px;
  height: 70px;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  /* 넘쳐나는 내용 무조건 숨김 */
  overflow-x: auto;
  /* 넘친 텍스트 ... 으로 처리 */
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  position: absolute;
  top: 120px;
  left: 18px;
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

const CategoryTab = styled.button`
  width: 96px;
  height: 38px;
  border-radius: 32px;
  border: 1px solid rgba(217, 217, 217, 1);
  background-color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-weight: 500;
`;

const Filterbar = styled.div`
  width: 375px;
  height: 31px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(181, 181, 181, 1);
  position: absolute;
  top: 192px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 7px;
  height: 12px;
  padding-top: 10px;
  .filterOption {
    font-size: 12px;
    color: rgba(181, 181, 181, 1);
    cursor: pointer;
  }
`;

const CategoryProductList = styled.div`
  width: 346px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  position: absolute;

  top: 230px;
`;
