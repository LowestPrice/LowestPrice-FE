import CategoryOnProductList from './CategoryOnProductList';
import styled from 'styled-components';

interface Props {
  categoryId: number;
  filterName: string;
  isFilter: boolean;
  isSoldout: boolean;
}

function CategoryList({ categoryId, filterName, isFilter, isSoldout }: Props) {
  return (
    <Wrap>
      <CategoryOnProductList categoryId={categoryId} filterName={filterName} isFilter={isFilter} isSoldout={isSoldout} />
    </Wrap>
  );
}

export default CategoryList;

const Wrap = styled.div`
  width: 370px;
`;
