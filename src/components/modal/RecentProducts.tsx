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
    const watchedIds = watchedItems ? JSON.parse(watchedItems) : [];
    setRecentProducts(watchedIds);
  }, []);

  // 로컬 스토리지에서 가져온 각 ID에 대한 쿼리
  const recentProductsQueries = useQueries(
    recentProducts.map((productId) => ({
      queryKey: ['product', productId],
      queryFn: () => getProduct(productId),
    }))
  );

  console.log(recentProductsQueries, '뭐나와?');
  recentProductsQueries.forEach((queryResult, index) => {
    console.log(`쿼리 ${index} 결과:`, queryResult.data.productId);
  });

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
          <p>최근 본 상품</p>
          <ul>
            {recentProductsQueries.map((query, index) => {
              const product = query.data;
              return (
                <div key={product ? product.productId : index}>
                  {product ? (
                    <Container onClick={() => navigate(`/detail/${product.productId}`)}>
                      <img src={product.productImage} alt={product.productName} />
                      <div>제품명: {product.productName}</div>
                      <div>원가: {product.originalPrice}</div>
                      <div>할인가: {product.currentPrice}</div>
                      <div>할인율: {product.discountRate}%</div>
                    </Container>
                  ) : (
                    '상품 정보 없음'
                  )}
                </div>
              );
            })}
          </ul>
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
  width: 80%;
  height: 100vh;
  position: relative;
  top: 0px;
  background-color: white;
  margin: 20%;
  padding: 50px 100px;
  border-radius: 10px;
  z-index: 999;
`;

const Container = styled.div`
  cursor: pointer;
`;
