import { useState, useEffect } from 'react';
import { useQueries } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import Loading from '../../components/Loading';
import Error from '../../components/Error';

import { getProduct } from '../../api/product';
import { DecreaseIcon, DeleteIcon, XIcon } from '../../assets/icon/icon';

const RecentProducts: React.FC<{ toggleModal: () => void; isOpen: boolean }> = ({ toggleModal, isOpen }) => {
  const [recentProducts, setRecentProducts] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 상품 ID 가져오기
    const watchedItems = localStorage.getItem('watched');
    let watchedIds = watchedItems ? JSON.parse(watchedItems) : [];

    // 배열 길이가 10개를 초과하는 경우, 가장 오래된 항목을 제거
    if (watchedIds.length > 15) {
      watchedIds = watchedIds.slice(-15);
    }

    setRecentProducts(watchedIds);
  }, []);

  // filter로 해서 클릭한 값의 상품명이랑 같은 상품명 (id값) 빼고 새로운 객체 반환해서 localstorage저장

  // 로컬 스토리지에서 가져온 각 ID에 대한 쿼리
  const recentProductsQueries = useQueries(
    recentProducts.map((productId) => ({
      queryKey: ['product', productId],
      queryFn: () => getProduct(productId),
    }))
  );

  const onRemoveHandler = () => {
    localStorage.removeItem('watched');
    // 빈 배열로 상품 목록
    setRecentProducts([]);
  };

  // 각 상품 지우기
  const removeEachProduct = (productId: string) => {
    const updatedProducts = recentProducts.filter((id) => id !== String(productId));

    localStorage.setItem('watched', JSON.stringify(updatedProducts));
    setRecentProducts(updatedProducts);
  };

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
      <ModalContent $isOpen={isOpen}>
        <Scroll>
          <Position>
            <TitleFlex>
              <Title>최근 본 상품</Title>
              <CloseButton onClick={toggleModal}>
                <XIcon />
              </CloseButton>
            </TitleFlex>
            <DeleteFlex>
              <Delete onClick={onRemoveHandler}>전체 삭제</Delete>
            </DeleteFlex>
          </Position>
          <ContainerWrap>
            {recentProductsQueries.length === 0 ? (
              <div style={{ width: '20.9375rem' }}>최근 본 상품이 없습니다</div>
            ) : (
              recentProductsQueries.map((query) => {
                const product = query.data;
                const formattedPrice = product ? product.currentPrice.toLocaleString() : '0';
                if (product && product.discountRate !== 0) {
                  return (
                    <div key={product.productId}>
                      <Container onClick={() => navigate(`/detail/${product.productId}`)}>
                        <img src={product.productImage} alt={product.productName} style={{ width: '4rem', height: '4rem', marginRight: '0.62rem' }} />
                        <ContentFlex>
                          <NameDelete>
                            <ProductName>{product.productName}</ProductName>
                            <EachProductDelete
                              onClick={(e) => {
                                e.stopPropagation();
                                removeEachProduct(product.productId);
                              }}
                            >
                              <DeleteIcon />
                            </EachProductDelete>
                          </NameDelete>
                          <PriceFlex>
                            <Price>{formattedPrice}원</Price>
                            <PercentageWrap>
                              <DecreaseIcon style={{ width: '0.875rem' }} />
                              <Percentage>{product.discountRate}%</Percentage>
                            </PercentageWrap>
                          </PriceFlex>
                        </ContentFlex>
                      </Container>
                    </div>
                  );
                }
                return null;
              })
            )}
          </ContainerWrap>
        </Scroll>
      </ModalContent>
    </>
  );
};

export default RecentProducts;

const ModalContent = styled.div<{ $isOpen: boolean }>`
  width: calc(20.9375rem - 1.5rem);
  height: ${({ $isOpen }) => ($isOpen ? '70vh' : '0px')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  z-index: 1000;
  padding: 0 0.75rem;
  transition: all 380ms ease-in-out;

  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 80vw;
    padding: 0 1.8rem;
  }
  @media screen and (min-width: 744px) {
    width: 720px;
    padding: 0 1.8rem;
  }
`;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 80vw;
  }
  @media screen and (min-width: 744px) {
    width: 720px;
  }
`;

const ContainerWrap = styled.div`
  padding-top: 150px;
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
  width: 14.625rem;
  color: #000;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 111.5%;
  margin-bottom: 0.875rem;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
    font-size: 1rem;
  }
  @media screen and (min-width: 744px) {
    width: 700px;
    font-size: 1rem;
  }
`;

const Price = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  font-size: 0.75rem;
`;

const PriceFlex = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 100%;
  }
`;

const Percentage = styled.div`
  font-size: 0.625rem;
  font-weight: 500;
  line-height: 110%;
  color: #137fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PercentageWrap = styled.div`
  width: 2.625rem;
  height: 0.9375rem;
  background-color: #9ecbff;
  margin-left: 0.12rem;
  display: flex;
  margin: 0.12rem;
  justify-content: center;
  align-items: center;
`;

const EachProductDelete = styled.button`
  background-color: transparent;
  border: none;
  z-index: 10;
  width: 30px;
  height: 30px;
  margin-right: 8px;
`;

const DeleteFlex = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Delete = styled.button`
  margin-top: 1rem;
  margin-bottom: 2rem;
  background-color: transparent;
  border: none;
`;

const NameDelete = styled.div`
  display: flex;
  flex-direction: row;
  width: 87%;
  align-items: flex-start;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
  }
`;

const Scroll = styled.div`
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 70vh;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    max-height: 70vh;
  }
  @media screen and (min-width: 744px) {
    max-height: 70vh;
  }
`;

const Position = styled.div`
  width: 311px;
  position: fixed;
  background-color: #f5f5f5;
  z-index: 1200;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 80vw;
  }
  @media screen and (min-width: 744px) {
    width: 720px;
  }
`;
