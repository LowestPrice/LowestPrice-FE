import styled from 'styled-components';
import SimilarProduct from './SimilarProduct';
import { useQuery } from 'react-query';
import { getSimilarProducts } from '../../../api/product';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { Product } from '../../../type';
type Props = {
  productId: string;
};

function SimilarProductList(props: Props) {
  const { status, data } = useQuery('similarProducts', () => getSimilarProducts(props.productId));
  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }
  return (
    <div>
      {data.length !== 0 ? (
        <SimilarProductWrap>
          <div className='title'>해당 상품과 비슷한 상품</div>
          <Wrap>
            {data.map((item: Product, index: number) => {
              return <SimilarProduct key={index} {...item} />;
            })}
          </Wrap>
        </SimilarProductWrap>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SimilarProductList;

const SimilarProductWrap = styled.div`
  width: 34.1475rem;
  height: 12.1875rem;
  gap: 0.875rem;
  margin-left: 0.625rem;
  .title {
    width: 11.1875rem;
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Wrap = styled.div`
  width: 23.4375rem;
  height: 11.5625rem;
  margin-top: 0.875rem;
  display: flex;
  flex-direction: row;
  gap: 0.9375rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 0.3125rem;
  }
  &::-webkit-scrollbar-thumb {
    height: 0.3125rem;
    background: rgba(181, 181, 181, 1);
    border-radius: 0.625rem;
  }
`;
