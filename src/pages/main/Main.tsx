import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import Cookies from 'js-cookie';

import Topten from './topten/Topten';
import PageFooter from '../../components/footer/PageFooter';
import CategoryTab from './category/CategoryTab';
import Logo from '../../assets/icon/Logo';
import FilterOption from './category/FilterOption';
import CategoryList from './category/list/CategoryProductList';
import SearchHistory from './recentSearch/SearchHistory';

import { Filter } from '../../type';
import Splash from './Splash';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';

interface InitialSearch {
  searchKeyword: string;
  searchFocus: boolean;
}

export default function Main() {
  const initialSearch = {
    searchKeyword: '',
    searchFocus: false,
  };

  // 상태 관리 ------------------------------------------------------------------------------------------------

  const [searchState, setSearchState] = useState<InitialSearch>(initialSearch);
  const [isCategorySelect, setIsCategorySelect] = useState<boolean[]>([true, false, false, false, false]);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>('');
  const [filterButton, setFilterButton] = useState<boolean[]>([false, false, false]);
  const [isSoldout, setIsSoldout] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  const isLogin = Cookies.get('isLogin');

  useEffect(() => {
    if (showSplash) {
      const splashTime = setTimeout(() => {
        setShowSplash(false);
      }, 1500);
      return () => clearTimeout(splashTime);
    }
  });

  // 카테고리 리스트 ------------------------------------------------

  const categoryList: string[] = useMemo(() => {
    return ['아이패드', '맥북', '맥', '에어팟', '아이폰', '애플워치'];
  }, []);

  // 필터 리스트 -----------------------------------------------------

  const filterList: Filter[] = useMemo(() => {
    return [
      { content: '할인순', value: 'discountRate_desc' },
      { content: '낮은가격순', value: 'price_asc' },
      { content: '높은가격순', value: 'price_desc' },
    ];
  }, []);

  // 네비게이트 -------------------

  const navigate = useNavigate();

  // 검색창 포커스 onOff -----------------------------------

  const handleFocusOn = () => {
    setSearchState({ ...searchState, searchFocus: true });
  };

  // 최근검색어 localStorage 에 저장 --------------------------------------------

  const addRecentSearchKeyword = (keyword: string) => {
    if (!keyword) {
      return;
    }
    const storedRecentList = localStorage.getItem('recentSearchKeywordList');

    let recentList: { id: string; keyword: string }[] = [];

    if (storedRecentList) {
      recentList = JSON.parse(storedRecentList);
    }
    const newKeywordObj = { id: uuid(), keyword: keyword };
    const newRecentList = [...recentList, newKeywordObj];
    localStorage.setItem('recentSearchKeywordList', JSON.stringify(newRecentList));
  };

  // 카테고리 버튼 클릭 ----------------------------------------------

  const handleCategoryButton = useCallback(
    (idx: any) => {
      setCategoryId(idx + 1);
      setIsCategorySelect(() => {
        const newArr = Array(6).fill(false);

        newArr[idx] = true;

        return newArr;
      });
    },
    [isCategorySelect, categoryId]
  );

  // 필터 버튼 클릭 ----------------------------------------

  const handleFilterButton = useCallback(
    (idx: number, value: string) => {
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
    },
    [isFilter, filterButton, filterName]
  );

  // 품절 상품 버튼 클릭 --------------------------------------------

  const handleSoldoutButton = () => {
    setIsSoldout(!isSoldout);
  };

  // 검색어 입력 ----------------------------------------------------

  const onChangeSearchWord = (e: any) => {
    setSearchState({ ...searchState, searchKeyword: e.target.value });
  };

  return (
    <>
      {showSplash && isLogin ? (
        <Splash />
      ) : (
        <>
          <MainWrap
            onClick={() => {
              setSearchState({ ...searchState, searchFocus: false });
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchState.searchKeyword === '') {
                  toast.error('검색어를 입력해주세요.');
                } else {
                  addRecentSearchKeyword(searchState.searchKeyword);
                  navigate(`/search/${searchState.searchKeyword}`);
                }
              }}
            >
              <Wraper>
                <Header>
                  <Logo />
                  <h3>내일은 최저가</h3>
                </Header>

                <Wrap>
                  <SearchInputWrap>
                    <SearchInput
                      type='text'
                      placeholder='검색'
                      value={searchState.searchKeyword}
                      onChange={(e) => {
                        onChangeSearchWord(e);
                      }}
                      onFocus={() => handleFocusOn()}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    ></SearchInput>
                    <button style={{ display: 'none' }} />
                    <XButton
                      onClick={() => {
                        setSearchState({ ...searchState, searchKeyword: '' });
                      }}
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path d='M18 6L6 18M18 18L6 6' stroke='#6F6F6F' strokeWidth='2' strokeLinecap='round' />
                      </svg>
                    </XButton>
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (searchState.searchKeyword === '') {
                          toast.error('검색어를 입력해주세요.');
                        } else {
                          addRecentSearchKeyword(searchState.searchKeyword);
                          navigate(`/search/${searchState.searchKeyword}`);
                        }
                      }}
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <circle cx='11' cy='11' r='9' transform='rotate(180 11 11)' stroke='#6F6F6F' strokeWidth='2' />
                        <path
                          d='M22.2813 23.6954C22.6653 24.0923 23.2983 24.1028 23.6953 23.7189C24.0922 23.3349 24.1027 22.7018 23.7187 22.3048L22.2813 23.6954ZM23.7187 22.3048L17.615 15.9952L16.1776 17.3857L22.2813 23.6954L23.7187 22.3048Z'
                          fill='#6F6F6F'
                        />
                      </svg>
                    </div>
                  </SearchInputWrap>

                  <SearchHistory onOff={searchState.searchFocus} />

                  <Title>
                    <div className='title'>오늘의 특가✔️</div>
                    <div className='subTitle'>할인율이 가장 높은 상품이에요</div>
                  </Title>
                  <Topten />
                </Wrap>

                <CategoryWrap>
                  <CategoryTitle>
                    <div>Apple 제품</div>
                    <div>가장 저렴할 때 구매하세요. 🔻</div>
                  </CategoryTitle>

                  <Swiper
                    modules={[Scrollbar]}
                    scrollbar={{ draggable: true, hide: true }}
                    slidesPerView={'auto'}
                    spaceBetween={25}
                    style={{
                      width: '100%',
                      height: '3.375rem',
                      borderBottom: '0.0625rem solid rgba(243, 243, 243, 1)',
                      paddingTop: '18px',
                    }}
                  >
                    {categoryList.map((item, index: number) => (
                      <SwiperSlide style={{ width: '96px' }} key={index}>
                        <CategoryTab
                          key={index}
                          children={index}
                          isCategorySelected={isCategorySelect}
                          handleCategoryButton={handleCategoryButton}
                          index={index}
                          content={item}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <Filterbar>
                    <Options>
                      {filterList.map((item, index) => {
                        return (
                          <FilterOption
                            children={index}
                            key={index}
                            handleFilterButton={handleFilterButton}
                            filterButton={filterButton}
                            content={item.content}
                            value={item.value}
                            isFilter={isFilter}
                            index={index}
                          ></FilterOption>
                        );
                      })}
                      <Soldout onClick={handleSoldoutButton} $isSoldout={isSoldout}>
                        품절상품제외
                      </Soldout>
                    </Options>
                  </Filterbar>

                  <CategoryList categoryId={categoryId} filterName={filterName} isFilter={isFilter} isSoldout={isSoldout} />
                </CategoryWrap>
              </Wraper>
              <div
                onClick={(e) => {
                  e.preventDefault();
                }}
              ></div>
            </form>
          </MainWrap>
          <PageFooter />
        </>
      )}
    </>
  );
}

const MainWrap = styled.div`
  height: 92%;
  overflow-x: hidden;
  position: fixed;
  padding-left: 20px;
  padding-right: 20px;
  min-width: 376px;
  &::-webkit-scrollbar {
    width: 0.3125rem; /* 5px / 16 = 0.3125rem */
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    height: 0.625rem; /* 10px / 16 = 0.625rem */
    background: rgba(181, 181, 181, 1);
    border-radius: 0.625rem; /* 10px / 16 = 0.625rem */
  }

  @media screen and (min-width: 744px) {
    width: 744px;
  }
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
`;

const Wraper = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  width: 375px;
  height: 3.875rem; /* 62px / 16 = 3.875rem */
  top: 2.125rem; /* 34px / 16 = 2.125rem */
  border-bottom: 0.0625rem solid rgba(243, 243, 243, 1); /* 1px / 16 = 0.0625rem */
  gap: 0.5rem; /* 8px / 16 = 0.5rem */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.9375rem; /* 15px / 16 = 0.9375rem */

  @media screen and (min-width: 744px) {
    width: 744px;
  }
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
`;

const Wrap = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchInputWrap = styled.div`
  width: 20.9375rem;
  height: 3.75rem; /* 60px / 16 = 3.75rem */
  border-radius: 3.75rem; /* 60px / 16 = 3.75rem */
  margin-top: 1.25rem; /* 20px / 16 = 1.25rem */
  border: none;
  outline: none;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 60px; /* 0.5px / 16 = 0.03125rem */
  border: 0.03125rem solid var(--gray02, #b5b5b5); /* 0.5px / 16 = 0.03125rem */
  background: #fff;

  /* Shadow01 */
  box-shadow: 0px 0.125rem 0.1875rem 0px rgba(0, 0, 0, 0.04), 0px 0.25rem 0.375rem 0.125rem rgba(0, 0, 0, 0.03);
  /* padding-left: 20px;
  padding-right: 20px; */
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 80%;
    height: 3.25rem;
  }
  @media screen and (min-width: 744px) {
    width: 80%;
    height: 3.25rem;
  }
`;

const SearchInput = styled.input`
  width: 70%;
  height: 1.25rem; /* 20px / 16 = 1.25rem */
  border: none;
  outline: none;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 80%;
  }
  @media screen and (min-width: 744px) {
    width: 80%;
  }
`;

const XButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.125rem; /* 18px / 16 = 1.125rem */
  height: 1.125rem; /* 18px / 16 = 1.125rem */
  margin-right: 15px; /* 10px / 16 = 0.625rem */
  cursor: pointer;
`;

const Title = styled.div`
  height: 3.125rem; /* 50px / 16 = 3.125rem */
  .title {
    font-size: 1.5rem; /* 24px / 16 = 1.5rem */
    font-weight: 600;
  }
  .subTitle {
    font-size: 1rem; /* 16px / 16 = 1rem */
  }
  gap: 0.3125rem; /* 5px / 16 = 0.3125rem */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.25rem; /* 20px / 16 = 1.25rem */
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  /* margin-top: -405px; */
  @media screen and (min-width: 744px) {
    width: 100%;
  }
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
`;

const CategoryTitle = styled.div`
  height: 4.375rem; /* 70px / 16 = 4.375rem */
  padding: 0.625rem; /* 10px / 16 = 0.625rem */
  border-bottom: 0.0625rem solid rgba(243, 243, 243, 1); /* 1px / 16 = 0.0625rem */
  font-size: 1.25rem; /* 20px / 16 = 1.25rem */
  gap: 1.375rem; /* 22px / 16 = 1.375rem */
  font-weight: 700;
`;

const Filterbar = styled.div`
  width: 100%;
  height: 1.9375rem; /* 31px / 16 = 1.9375rem */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.75rem; /* 12px / 16 = 0.75rem */
  color: var(--gray03, #6f6f6f);
  position: absolute;
  top: 10.875rem; /* 174px / 16 = 10.875rem */
`;

const Options = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.4375rem; /* 7px / 16 = 0.4375rem */
  height: 0.75rem; /* 12px / 16 = 0.75rem */
  padding-top: 0.625rem; /* 10px / 16 = 0.625rem */
  position: relative;
`;

const Soldout = styled.div<{ $isSoldout: boolean }>`
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.75rem; /* 12px / 16 = 0.75rem */
  color: ${(props) => (!props.$isSoldout ? 'var(--gray03, #6F6F6F)' : 'var(--maincolor_dark, #00ABF9)')};
`;
