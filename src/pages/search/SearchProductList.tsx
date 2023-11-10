import SearchProduct from './SearchProduct';
import styled from 'styled-components';
import { useEffect } from 'react';
import { Product } from '../../type';
import Loading from '../../components/Loading';
import { infiniteSearch, infiniteSearchFilter } from '../../infiniteQueries/search';
import Observer from '../../components/Observer';
import { toast } from 'react-toastify';

interface Props {
  searchWord: string | undefined;
  isSoldout: boolean;
  isFilter: boolean;
  filterName: string;
  filterButton: boolean[];
}

function SearchProductList(props: Props) {
  // useInfiniteQuery 데이터 -----------------------------------------------------------

  const infiniteSearchData = infiniteSearch(props.searchWord, props.isSoldout);

  const infiniteSearchFilterData = infiniteSearchFilter(props.filterName, props.searchWord, props.isSoldout, props.filterButton);

  // 필터버튼 클릭할 때마다 리패치 -------------------------------------------------------------------------

  useEffect(() => {
    infiniteSearchData.refetch();
    infiniteSearchFilterData.refetch();
  }, [props.filterButton, props.isFilter, props.isSoldout]);

  // 로딩, 에러 관리 ---------------------------------------------------------

  if (infiniteSearchData.status === 'loading') {
    return <Loading />;
  }
  if (infiniteSearchData.status === 'error') {
    toast.error('찾으시는 상품이 존재하지 않습니다❗️');
  }
  if (infiniteSearchFilterData.status === 'loading') {
    return <Loading />;
  }
  if (infiniteSearchFilterData.status === 'error') {
    toast.error('찾으시는 상품이 존재하지 않습니다❗️');
  }

  // 2차원 배열 -> 1차원 배열로 변경 ------------------------------------------

  const infiniteSearchDataList = (): Product[] | undefined => {
    if (infiniteSearchData.data) {
      const copyData: Product[][] = [...infiniteSearchData.data?.pages];
      if (copyData[copyData.length - 1] === undefined) {
        copyData.pop();
      }
      const result = copyData.reduce(function (acc, cur) {
        return acc.concat(cur);
      });
      return result;
    }
  };

  const infiniteSearchFilterDataList = (): Product[] | undefined => {
    if (infiniteSearchFilterData.data) {
      const copyData: Product[][] = [...infiniteSearchFilterData.data?.pages];
      if (copyData[copyData.length - 1] === undefined) {
        copyData.pop();
      }
      const result = copyData.reduce(function (acc, cur) {
        return acc.concat(cur);
      });
      return result;
    }
  };

  // Observer -------------------------------------------

  const handleIntersection = () => {
    if ((props.isFilter ? infiniteSearchFilterData : infiniteSearchData).hasNextPage) {
      infiniteSearchData.fetchNextPage();
      infiniteSearchFilterData.fetchNextPage();
    }
  };

  console.log(infiniteSearchData.data);

  return (
    <Wrap>
      {props.isFilter
        ? infiniteSearchFilterDataList()?.map((item: Product, index: number) => {
            return <SearchProduct key={index} {...item} />;
          })
        : infiniteSearchDataList()?.map((item: Product, index: number) => {
            return <SearchProduct key={index} {...item} />;
          })}
      {(props.isFilter ? infiniteSearchFilterData : infiniteSearchData).hasNextPage && <Observer handleIntersection={handleIntersection} />}
    </Wrap>
  );
}

export default SearchProductList;

const Wrap = styled.div`
  width: 21.625rem;
  max-height: 82vh;
  overflow-x: hidden;
  overflow-y: scroll;
  /* margin-bottom: 30px; */
  &::-webkit-scrollbar {
    width: 0.3125rem;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background: rgba(181, 181, 181, 1);
    border-radius: 0.625rem;
  }
  padding: 0.625rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
    justify-content: space-around;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
    justify-content: space-around;
  }
`;
