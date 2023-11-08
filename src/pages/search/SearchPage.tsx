import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Params } from '../../type';
import { Filter } from '../../type';

import SearchProductList from './SearchProductList';
import PageFooter from '../../components/footer/PageFooter';
import FilterOption from './FilterOption';

function Search() {
  // params 를 통해 productId 받아오기 -------------------------

  const params: Params = useParams();
  const navigate = useNavigate();

  // 상태 관리 ------------------------------------------------------------------------

  const [searchWord, setSearchWord] = useState<string>(`${params.searchWord}`);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>(``);
  const [filterButton, setFilterButton] = useState<boolean[]>([false, false, false]);
  const [isSoldout, setIsSoldout] = useState<boolean>(false);

  // 필터버튼 클릭할 때마다 리패치 -------------------------------------------------------------------------

  useEffect(() => {
    console.log('서치페이지 렌더링');
  }, []);
  // 필터 리스트 -------------------------------------------

  const filterList: Filter[] = [
    { content: '할인순', value: 'discountRate_desc' },
    { content: '낮은가격순', value: 'price_asc' },
    { content: '높은가격순', value: 'price_desc' },
  ];

  // 검색어 입력 --------------------------------------------------

  const onChangeSearchWord = (e: any) => {
    setSearchWord(e.target.value);
  };

  // 필터 버튼 클릭 ------------------------------------------------------------

  const handleFilterButton = (idx: number, value: string) => {
    setIsFilter(true);
    setFilterName(value);
    setFilterButton(() => {
      const newArr = Array(3).fill(false);
      if (filterButton[idx] === true) {
        newArr[idx] = false;
        setIsFilter(false);
      } else {
        newArr[idx] = true;
      }
      return newArr;
    });
  };

  // 화면 ================================================================

  return (
    <Wrap>
      <form
        onSubmit={(e) => {
          navigate(`/search/${searchWord}`);
          e.preventDefault();
        }}
      >
        <Header>
          <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
            <svg xmlns='http://www.w3.org/2000/svg' width='17' height='18' viewBox='0 0 17 18' fill='none'>
              <path d='M9 1L1 9L9 17' stroke='#6F6F6F' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
          <SearchInputWrap>
            <SearchInput
              type='text'
              value={searchWord}
              onChange={(e) => {
                onChangeSearchWord(e);
              }}
            ></SearchInput>
          </SearchInputWrap>
          <button style={{ display: 'none' }} />
        </Header>
        <Filterbar>
          <Options>
            {filterList.map((item, index) => {
              return (
                <FilterOption key={index} index={index} filterButton={filterButton} handleFilterButton={handleFilterButton} isFilter={isFilter} {...item} />
              );
            })}
            <Soldout
              onClick={() => {
                setIsSoldout(!isSoldout);
              }}
              $isSoldout={isSoldout}
            >
              품절상품제외
            </Soldout>
          </Options>
        </Filterbar>
        <SearchProductList searchWord={params.searchWord} isSoldout={isSoldout} isFilter={isFilter} filterName={filterName} filterButton={filterButton} />

        <PageFooter />
      </form>
    </Wrap>
  );
}

export default Search;

const Wrap = styled.div`
  width: 100%;
`;
const Header = styled.div`
  width: 23.4375rem;
  height: 3.875rem;
  top: 2.125rem;
  padding: 0.75rem 0.75rem 0.75rem 0.75rem;
  border-bottom: 0.0625rem solid rgba(243, 243, 243, 1);
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
    padding: 0px;
    padding-right: 10px;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
    padding: 0px;
    justify-content: space-between;
  }
`;

const SearchInputWrap = styled.div`
  width: 18rem;
  height: 2.375rem;
  border-radius: 2.888125rem;
  border: none;
  box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;

  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 90%;
    height: 2.5rem;
    border-radius: 0.1875rem;
    background: var(--gray00, #f3f3f3);
  }
  @media screen and (min-width: 744px) {
    width: 95%;
    height: 2.5rem;
    border-radius: 0.1875rem;
    background: var(--gray00, #f3f3f3);
  }
`;

const SearchInput = styled.input`
  width: 15.1875rem;
  height: 2.375rem;
  border: none;
  outline: none;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
    height: 1.25rem;
    color: var(--black, #000);
    background: var(--gray00, #f3f3f3);
  }
  @media screen and (min-width: 744px) {
    width: 80%;
    padding: 0px;
    height: 1.25rem;
    color: var(--black, #000);
    background: var(--gray00, #f3f3f3);
  }
`;

const Filterbar = styled.div`
  width: 23.4375rem;
  height: 1.9375rem;
  border-bottom: 0.0625rem solid rgba(243, 243, 243, 1);
  display: flex;
  flex-direction: row;
  font-size: 0.75rem;
  color: rgba(181, 181, 181, 1);
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
    position: relative;
  }
  @media screen and (min-width: 744px) {
    width: 100%;
    position: relative;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4375rem;
  height: 0.75rem;
  padding-top: 0.625rem;
  width: 23.4375rem;
  height: 0.8125rem;
`;

const Soldout = styled.div<{ $isSoldout: boolean }>`
  font-size: 12px;
  margin-left: 9.375rem;
  cursor: pointer;
  color: ${(props) => (!props.$isSoldout ? 'rgba(181, 181, 181, 1)' : 'var(--maincolor_dark, #00ABF9)')};
  @media screen and (max-width: 743px) and (min-width: 376px) {
    position: absolute;
    right: 10px;
  }
  @media screen and (min-width: 744px) {
    position: absolute;
    right: 10px;
  }
`;
