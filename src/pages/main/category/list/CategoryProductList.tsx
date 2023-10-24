import React from 'react';
import CategoryOffProductList from './CategoryOffProductList';
import CategoryOnProductList from './CategoryOnProductList';
import styled from 'styled-components';

interface Props {
  isOnCategory: boolean;
  categoryId: number;
  filterName: string;
  isFilter: boolean;
}

function CategoryList({ isOnCategory, categoryId, filterName, isFilter }: Props) {
  return (
    <Wrap>{isOnCategory ? <CategoryOnProductList categoryId={categoryId} filterName={filterName} isFilter={isFilter} /> : <CategoryOffProductList />}</Wrap>
  );
}

export default React.memo(CategoryList);

const Wrap = styled.div`
  width: 370px;
`;
