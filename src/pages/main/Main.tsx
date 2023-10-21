import styled from 'styled-components';
import Topten from './topten/Topten';
import CategoryOffProductList from './category/category_off/CategoryOffProductList';
import PageFooter from '../../components/footer/PageFooter';
import { useEffect, useState } from 'react';
import CategoryTab from './category/CategoryTab';
import CategoryOnProductList from './category/category_on/CategoryOnProductList';
import Logo from '../../assets/icon/Logo';
import { Filter } from '../../type';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Main() {
  // 상태 관리 ------------------------------------------------------------------------------------------------
  const [searchWord, setSearchWord] = useState<string>('');
  const [isOnCategory, setIsOnCategory] = useState<boolean>(false);
  const [isCategorySelect, setIsCategorySelect] = useState<boolean[]>([false, false, false, false, false]);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [filterName, setFilterName] = useState<string>('');
  const [isFilter, setIsFilter] = useState<boolean>(false);
  // const [filterOptionBtn, setFilterOptionBtn] = useState<boolean>(false);

  // 카테고리 리스트 ------------------------------------------------------------------------------------

  const categoryList: string[] = ['아이패드', '맥북', '맥', '에어팟', '아이폰', '애플워치'];

  useEffect(() => {
    Cookies.set('name', 'value');
    console.log(Cookies.get('Authorization'));
  });

  // 필터 리스트 -------------------------------------------

  const filterList: Filter[] = [
    { content: '할인순', value: 'discountRate_desc' },
    { content: '낮은가격순', value: 'price_asc' },
    { content: '높은가격순', value: 'price_desc' },
  ];

  // 네비게이트 ------------------------

  const navigate = useNavigate();

  // 카테고리 버튼 색 변경 ------------------------------------

  const handleCategoryButton = (idx: any) => {
    const newArr = Array(6).fill(false);
    newArr[idx] = true;
    console.log(newArr);
    setIsOnCategory(true);
    setIsCategorySelect(newArr);
    setCategoryId(idx + 1);
  };

  // 카테고리 필터 변경 ---------------------------------------------------------

  const handleFilterButton = (e: any) => {
    setFilterName(e.id);
    setIsFilter(!isFilter);
  };

  // 검색어 입력 --------------------------------------------------

  const onChangeSearchWord = (e: any) => {
    setSearchWord(e.target.value);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search/${searchWord}`);
        }}
      >
        <div style={{ height: '100%', position: 'relative', width: '100%' }}>
          <Header>
            <Logo />
            <h3>내일은 최저가</h3>
          </Header>
          <Wrap>
            <SearchInputWrap>
              <SearchInput
                type='text'
                placeholder='검색'
                value={searchWord}
                onChange={(e) => {
                  onChangeSearchWord(e);
                }}
              ></SearchInput>
              <button style={{ display: 'none' }} />
            </SearchInputWrap>
            <Title>
              <div className='title'>오늘의 특가</div>
              <div className='subTitle'>할인율이 가장 높은 상품이에요</div>
            </Title>
            <Topten />
            <CategoryWrap>
              <CategoryTitle>
                <div>Apple 제품</div>
                <div>가장 저렴할 때 구매하세요.</div>
              </CategoryTitle>
              <CategoryTabWrap>
                {categoryList.map((item, index: number) => {
                  return (
                    <CategoryTab
                      key={index}
                      children={index}
                      isCategorySelected={isCategorySelect}
                      handleCategoryButton={handleCategoryButton}
                      index={index}
                      content={item}
                    />
                  );
                })}
              </CategoryTabWrap>
              <Filterbar>
                <Options>
                  {filterList.map((item, index) => {
                    return (
                      <FilterOption
                        key={index}
                        id={item.value}
                        onClick={(e) => {
                          handleFilterButton(e.target);
                        }}
                      >
                        {item.content}
                      </FilterOption>
                    );
                  })}
                </Options>
              </Filterbar>
              {isOnCategory ? <CategoryOnProductList categoryId={categoryId} filterName={filterName} isFilter={isFilter} /> : <CategoryOffProductList />}
            </CategoryWrap>
          </Wrap>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <PageFooter />
        </div>
      </form>
    </div>
  );
}

const Header = styled.div`
  width: 375px;
  height: 62px;
  top: 34px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  gap: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
`;

const Wrap = styled.div`
  width: 375px;
  height: 550.32px;
  background: linear-gradient(180deg, #cdcdcd 0%, rgba(213, 213, 213, 0.915044) 13.02%, rgba(171, 171, 171, 0.36) 58.85%, rgba(171, 171, 171, 0) 79.17%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInputWrap = styled.div`
  width: 300px;
  height: 60px;
  border-radius: 60px;
  margin-top: 20px;
  border: none;
  outline: none;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 250px;
  height: 20px;
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

const CategoryWrap = styled.div`
  width: 374px;

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
  gap: 22px;
`;

const CategoryTabWrap = styled.div`
  display: flex;
  width: 357px;
  height: 70px;
  flex-direction: row;
  white-space: nowrap;
  /* 넘쳐나는 내용 무조건 숨김 */
  overflow-x: auto;
  /* 넘친 텍스트 ... 으로 처리 */
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  position: absolute;
  top: 94px;
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
  top: 174px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 7px;
  height: 12px;
  padding-top: 10px;
`;

const FilterOption = styled.div`
  font-size: 12px;
  color: rgba(181, 181, 181, 1);
  cursor: pointer;
`;
