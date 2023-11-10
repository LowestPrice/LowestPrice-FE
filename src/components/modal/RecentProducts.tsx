import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getProduct } from '../../api/product';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useQueries } from 'react-query';
import { useNavigate } from 'react-router';

const RecentProducts: React.FC<{ toggleModal: () => void }> = ({ toggleModal }) => {
  const [recentProducts, setRecentProducts] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 상품 ID 가져오기
    const watchedItems = localStorage.getItem('watched');
    let watchedIds = watchedItems ? JSON.parse(watchedItems) : [];

    // 배열 길이가 10개를 초과하는 경우, 가장 오래된 항목을 제거
    if (watchedIds.length > 10) {
      watchedIds = watchedIds.slice(-4);
    }

    setRecentProducts(watchedIds);
  }, []);

  // 로컬 스토리지에서 가져온 각 ID에 대한 쿼리
  const recentProductsQueries = useQueries(
    recentProducts.map((productId) => ({
      queryKey: ['product', productId],
      queryFn: () => getProduct(productId),
    }))
  );

  // console.log(recentProductsQueries, '뭐나와?');
  // recentProductsQueries.forEach((queryResult, index) => {
  //   console.log(`쿼리 ${index} 결과:`, queryResult.data.productId);
  // });

  const isLoading = recentProductsQueries.some((query) => query.isLoading);
  const isError = recentProductsQueries.some((query) => query.isError);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Modal>
        <ModalOverlay onClick={toggleModal} />
        <ModalContent>
          <TitleFlex>
            <Title>최근 본 상품</Title>
            <CloseButton>X</CloseButton>
          </TitleFlex>
          <div>지우기</div>
          <div>
            {recentProductsQueries.map((query, index) => {
              const product = query.data;
              return (
                <div key={product ? product.productId : index}>
                  {product ? (
                    <Container onClick={() => navigate(`/detail/${product.productId}`)}>
                      <img src={product.productImage} alt={product.productName} style={{ width: '4rem', height: '4rem' }} />
                      <ContentFlex>
                        <ProductName>제품명: {product.productName}</ProductName>
                        {/* <div>원가: {product.originalPrice}</div> */}
                        <PriceFlex>
                          <Price>{product.currentPrice}원</Price>
                          <Percentage>{product.discountRate}%</Percentage>
                        </PriceFlex>
                      </ContentFlex>
                    </Container>
                  ) : (
                    <div>최근 보신 상품이 존재하지 않습니다.</div>
                  )}
                </div>
              );
            })}
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecentProducts;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
`;

const ModalContent = styled.div`
  width: 20.9375rem;
  height: 33.5rem;
  position: relative;
  top: 0px;
  background-color: white;
  margin: 20%;
  border-radius: 0.5rem;
  z-index: 999;
  padding: 0 1.12rem;
`;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 20.9375rem;
  height: 5.625rem;
`;

const Title = styled.div`
  color: #000;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 110%;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
`;

const TitleFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const ContentFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.div`
  color: #000;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 111.5%;
`;

const Price = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  font-size: 0.75rem;
`;

const PriceFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

const Percentage = styled.div`
  font-size: 0.625rem;
  font-weight: 500;
  line-height: 110%;
`;
