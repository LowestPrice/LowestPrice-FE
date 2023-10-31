import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import Topten from './topten/Topten';
import PageFooter from '../../components/footer/PageFooter';
import CategoryTab from './category/CategoryTab';
import Logo from '../../assets/icon/Logo';
import FilterOption from './category/FilterOption';
import CategoryList from './category/list/CategoryProductList';

import { Filter } from '../../type';

export default function Main() {
  // 상태 관리 ------------------------------------------------------------------------------------------------

  const [searchWord, setSearchWord] = useState<string>('');
  const [isOnCategory, setIsOnCategory] = useState<boolean>(false);
  const [isCategorySelect, setIsCategorySelect] = useState<boolean[]>([false, false, false, false, false]);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>('');
  const [filterButton, setFilterButton] = useState<boolean[]>([false, false, false]);
  const [isSoldout, setIsSoldout] = useState<boolean>(false);

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
      setIsOnCategory(true);
      setCategoryId(idx + 1);
      setIsCategorySelect(() => {
        const newArr = Array(6).fill(false);
        if (isCategorySelect[idx] === true) {
          newArr[idx] = false;
          setIsOnCategory(false);
        } else {
          newArr[idx] = true;
        }
        return newArr;
      });
    },
    [isCategorySelect, isOnCategory, categoryId]
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

  return (
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
              <Filterbar $isCategoryOn={isOnCategory}>
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
              <CategoryList isOnCategory={isOnCategory} categoryId={categoryId} filterName={filterName} isFilter={isFilter} isSoldout={isSoldout} />
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
  );
}

const MainWrap = styled.div`
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: rgba(181, 181, 181, 1);

    border-radius: 10px;
  }
`;

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
  background: white;
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

  border-radius: 60px;
  border: 0.5px solid var(--gray02, #b5b5b5);
  background: #fff;

  /* Shadow01 */
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.04), 0px 4px 6px 2px rgba(0, 0, 0, 0.03);
`;

const SearchInput = styled.input`
  width: 219px;
  height: 20px;
  border: none;
  outline: none;
`;

const Title = styled.div`
  width: 199px;
  height: 50px;
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .subTitle {
    font-size: 16px;
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
  width: 350px;
  height: 70px;
  padding: 10px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  font-size: 20px;
  font-weight: 700;
  gap: 22px;
`;

const CategoryTabWrap = styled.div`
  display: flex;
  width: 370px;
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

const Filterbar = styled.div<{ $isCategoryOn: boolean }>`
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
  display: ${(props) => (props.$isCategoryOn ? 'block' : 'none')};
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 7px;
  height: 12px;
  padding-top: 10px;
`;

const Soldout = styled.div<{ $isSoldout: boolean }>`
  margin-left: 150px;
  cursor: pointer;
  color: ${(props) => (!props.$isSoldout ? 'rgba(181, 181, 181, 1)' : 'var(--maincolor_dark, #00ABF9)')};
`;
