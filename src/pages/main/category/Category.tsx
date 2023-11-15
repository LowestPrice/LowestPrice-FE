import React, { useState, useMemo, useCallback } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';
import styled from 'styled-components';

import { Filter } from '../../../type';
import CategoryTab from './CategoryTab';
import FilterOption from './FilterOption';
import CategoryList from './list/CategoryProductList';

function Category() {
  // (카테고리 이름, 카테고리 버튼 색), (필터 이름, 필터 버튼 클릭 유무, 필터 버튼 색), 품절상품 상태 관리 ---------------

  const [isCategorySelect, setIsCategorySelect] = useState<boolean[]>([true, false, false, false, false, false]);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>('');
  const [filterButton, setFilterButton] = useState<boolean[]>([false, false, false]);
  const [isSoldout, setIsSoldout] = useState<boolean>(true);

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

  return (
    <CategoryWrap>
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
  );
}

export default React.memo(Category);

const CategoryWrap = styled.div`
  width: 375px;
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

const Filterbar = styled.div`
  width: 100%;
  height: 1.9375rem; /* 31px / 16 = 1.9375rem */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.75rem; /* 12px / 16 = 0.75rem */
  color: var(--gray03, #6f6f6f);
  position: absolute;
  top: 4.875rem; /* 174px / 16 = 10.875rem */
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
  color: ${(props) => (!props.$isSoldout ? 'var(--maincolor_dark, #00ABF9)' : 'var(--gray03, #6F6F6F)')};
`;
