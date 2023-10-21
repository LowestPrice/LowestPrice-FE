import styled from 'styled-components';
import SearchProduct from './SearchProduct';
import PageFooter from '../../components/footer/PageFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { Params, Product } from '../../type';
import { useEffect, useState } from 'react';
import { getFilteredSearch, getSearch } from '../../api/product';
import { useQueries } from 'react-query';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { Filter } from '../../type';
import FilterOption from './FilterOption';

function Search() {
  // params 를 통해 productId 받아오기 -------------------------

  const params: Params = useParams();

  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState<string>(`${params.searchWord}`);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>(``);
  const [filterButton, setFilterButton] = useState<boolean[]>([false, false, false]);

  // 데이터 불러오기 -----------------------------

  const result = useQueries([
    { queryKey: ['searchProduct', params.searchWord], queryFn: () => getSearch(params.searchWord) },
    { queryKey: ['FilteredSearchProduct'], queryFn: () => getFilteredSearch(filterName, params.searchWord) },
  ]);

  // 리패치 -------------------------------------
  
  useEffect(() => {
    result[1].refetch();
  }, [filterButton]);

  // 로딩, 에러 관리 ---------------------------------------------------------
  if (result[0].status === 'loading') {
    return <Loading />;
  }
  if (result[0].status === 'error') {
    return <Error />;
  }

  if (result[1].status === 'loading') {
    return <Loading />;
  }
  if (result[1].status === 'error') {
    return <Error />;
  }

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
    const newArr = Array(3).fill(false);
    console.log(idx, value);
    newArr[idx] = !newArr[idx];
    console.log(newArr);
    setIsFilter(true);
    setFilterButton(newArr);
    setFilterName(value);
  };

  // 필터 색상 변경 --------------------------------------------

  // 화면 ================================================================

  return (
    <div>
      <form
        onSubmit={(e) => {
          navigate(`/search/${searchWord}`);
          e.preventDefault();
        }}
      >
        <div>
          <Header>
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
            </Options>
          </Filterbar>
          <SearchProductList>
            {isFilter
              ? result[1].data.map((item: Product, index: number) => {
                  return <SearchProduct key={index} {...item} />;
                })
              : result[0].data.map((item: Product, index: number) => {
                  return <SearchProduct key={index} {...item} />;
                })}
          </SearchProductList>
        </div>
        <PageFooter />
      </form>
    </div>
  );
}

export default Search;

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
  align-items: center;
`;

const SearchInputWrap = styled.div`
  width: 288px;
  height: 38px;
  border-radius: 46.21px;
  border: none;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 243px;
  height: 38px;
  border: none;
  outline: none;
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
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 7px;
  height: 12px;
  padding-top: 10px;
  width: 156px;
  height: 13px;
`;

const SearchProductList = styled.div`
  width: 346px;
  max-height: 710px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: rgba(181, 181, 181, 1);

    border-radius: 10px;
  }
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;