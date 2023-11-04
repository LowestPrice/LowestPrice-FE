import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import Topten from './topten/Topten';
import PageFooter from '../../components/footer/PageFooter';
import CategoryTab from './category/CategoryTab';
import Logo from '../../assets/icon/Logo';
import FilterOption from './category/FilterOption';
import CategoryList from './category/list/CategoryProductList';

import { Filter } from '../../type';
import Splash from './Splash';

export default function Main() {
  // 상태 관리 ------------------------------------------------------------------------------------------------

  const [searchWord, setSearchWord] = useState<string>('');
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
  }, []);

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
    setSearchWord(e.target.value);
  };

  // console.log(encodeURIComponent(import.meta.env.VITE_KAKAO_CLIENT_ID));
  // console.log(import.meta.env.VITE_KAKAO_CLIENT_ID);

  return (
    <>
      {showSplash && isLogin ? (
        <Splash />
      ) : (
        <MainWrap>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchWord === '') {
                toast.error('검색어를 입력해주세요.');
              } else {
                navigate(`/search/${searchWord}`);
              }
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
                  <XButton
                    onClick={() => {
                      setSearchWord('');
                    }}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <path d='M18 6L6 18M18 18L6 6' stroke='#6F6F6F' strokeWidth='2' strokeLinecap='round' />
                    </svg>
                  </XButton>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (searchWord === '') {
                        toast.error('검색어를 입력해주세요.');
                      } else {
                        navigate(`/search/${searchWord}`);
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

                <Title>
                  <div className='title'>오늘의 특가✔️</div>
                  <div className='subTitle'>할인율이 가장 높은 상품이에요</div>
                </Title>

                <Topten />

                <CategoryWrap>
                  <CategoryTitle>
                    <div>Apple 제품</div>
                    <div>가장 저렴할 때 구매하세요. 🔻</div>
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
        </MainWrap>
      )}
    </>
  );
}

const MainWrap = styled.div`
  height: 100vh;
  overflow: scroll;
  position: fixed;
  &::-webkit-scrollbar {
    width: 0.3125rem; /* 5px / 16 = 0.3125rem */
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    height: 0.625rem; /* 10px / 16 = 0.625rem */
    background: rgba(181, 181, 181, 1);
    border-radius: 0.625rem; /* 10px / 16 = 0.625rem */
  }
`;

const Header = styled.div`
  width: 22.5rem; /* 360px / 16 = 22.5rem */
  height: 3.875rem; /* 62px / 16 = 3.875rem */
  top: 2.125rem; /* 34px / 16 = 2.125rem */
  border-bottom: 0.0625rem solid rgba(243, 243, 243, 1); /* 1px / 16 = 0.0625rem */
  gap: 0.5rem; /* 8px / 16 = 0.5rem */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.9375rem; /* 15px / 16 = 0.9375rem */
`;

const Wrap = styled.div`
  width: 23.4375rem; /* 375px / 16 = 23.4375rem */
  height: 34.395rem; /* 550.32px / 16 = 34.395rem */
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInputWrap = styled.div`
  width: 18.75rem; /* 300px / 16 = 18.75rem */
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
`;

const SearchInput = styled.input`
  width: 13.6875rem; /* 219px / 16 = 13.6875rem */
  height: 1.25rem; /* 20px / 16 = 1.25rem */
  border: none;
  outline: none;
`;

const XButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.125rem; /* 18px / 16 = 1.125rem */
  height: 1.125rem; /* 18px / 16 = 1.125rem */
  margin-right: 0.625rem; /* 10px / 16 = 0.625rem */
  cursor: pointer;
`;

const Title = styled.div`
  width: 12.4375rem; /* 199px / 16 = 12.4375rem */
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
  width: 23.125rem; /* 374px / 16 = 23.125rem */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CategoryTitle = styled.div`
  width: 21.875rem; /* 350px / 16 = 21.875rem */
  height: 4.375rem; /* 70px / 16 = 4.375rem */
  padding: 0.625rem; /* 10px / 16 = 0.625rem */
  border-bottom: 0.0625rem solid rgba(243, 243, 243, 1); /* 1px / 16 = 0.0625rem */
  font-size: 1.25rem; /* 20px / 16 = 1.25rem */
  gap: 1.375rem; /* 22px / 16 = 1.375rem */
  font-weight: 700;
`;

const CategoryTabWrap = styled.div`
  display: flex;
  width: 23.125rem; /* 370px / 16 = 23.125rem */
  height: 4.375rem; /* 70px / 16 = 4.375rem */
  flex-direction: row;
  white-space: nowrap;
  /* 넘쳐나는 내용 무조건 숨김 */
  overflow-x: auto;
  /* 넘친 텍스트 ... 으로 처리 */
  align-items: center;
  gap: 0.625rem; /* 10px / 16 = 0.625rem */
  border-bottom: 0.0625rem solid rgba(243, 243, 243, 1); /* 1px / 16 = 0.0625rem */
  position: absolute;
  top: 5.875rem;
  left: -1px;
  padding-left: 2px;
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
  width: 23.4375rem; /* 375px / 16 = 23.4375rem */
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.4375rem; /* 7px / 16 = 0.4375rem */
  height: 0.75rem; /* 12px / 16 = 0.75rem */
  padding-top: 0.625rem; /* 10px / 16 = 0.625rem */
`;

const Soldout = styled.div<{ $isSoldout: boolean }>`
  margin-left: 9.375rem; /* 150px / 16 = 9.375rem */
  cursor: pointer;
  font-weight: 500;
  color: ${(props) => (!props.$isSoldout ? 'var(--gray03, #6F6F6F)' : 'var(--maincolor_dark, #00ABF9)')};
`;
