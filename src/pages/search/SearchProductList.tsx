import SearchProduct from './SearchProduct';
import styled from 'styled-components';
import { useEffect } from 'react';
import { Product } from '../../type';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { infiniteSearch } from '../../infiniteQueries/search';
import Observer from '../../components/Observer';

interface Props {
  searchWord: string | undefined;
  isSoldout: boolean;
  isFilter: boolean;
  filterName: string;
  filterButton: boolean[];
}

function SearchProductList(props: Props) {
  // 검색한 상품과 검색한 상품을 필터링한 데이터 불러오기 -----------------------------------------------------------------

  // const result = useQueries([
  //   { queryKey: ['searchProduct', props.searchWord], queryFn: () => getSearch(props.searchWord, props.isSoldout) },
  //   {
  //     queryKey: ['FilteredSearchProduct'],
  //     queryFn: () => getFilteredSearch(props.filterName, props.searchWord, props.isSoldout),
  //     enabled: !!props.filterButton,
  //   },
  // ]);

  const infiniteSearchData = infiniteSearch(props.searchWord, props.isSoldout);

  // 필터버튼 클릭할 때마다 리패치 -------------------------------------------------------------------------

  useEffect(() => {}, [props.filterButton, props.isFilter]);

  // 로딩, 에러 관리 ---------------------------------------------------------

  if (infiniteSearchData.status === 'loading') {
    return <Loading />;
  }
  if (infiniteSearchData.status === 'error') {
    return <Error />;
  }

  // if (result[1].status === 'loading') {
  //   return <Loading />;
  // }
  // if (result[1].status === 'error') {
  //   return <Error />;
  // }

  const infiniteSearchDataList: Product[] = infiniteSearchData.data?.pages.reduce(function (acc, cur) {
    return acc.concat(cur);
  });

  const handleIntersection = () => {
    infiniteSearchData.fetchNextPage();
    // infiniteCategoryData.fetchNextPage();
  };

  return (
    <div>
      <Wrap>
        {props.isFilter
          ? result[1].data.map((item: Product, index: number) => {
              return <SearchProduct key={index} {...item} />;
            })
          : infiniteSearchDataList.map((item: Product, index: number) => {
              return <SearchProduct key={index} {...item} />;
            })}
        <Observer handleIntersection={handleIntersection} />
      </Wrap>
    </div>
  );
}

export default SearchProductList;

const Wrap = styled.div`
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
