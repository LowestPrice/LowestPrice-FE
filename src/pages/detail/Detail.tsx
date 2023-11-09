import { useState } from 'react';
import styled from 'styled-components';

import { getProduct } from '../../api/product';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Loading from '../../components/Loading';
import Error from '../../components/Error';
import OptionModal from './option/OptionModal';
import AlarmFooter from '../../components/footer/AlarmFooter';
import { PriceChart, PriceDataWrap } from './PriceHistory';
import SimilarProductList from './similar/SimilarProductList';
import { GreyShareIcon } from '../../assets/icon/icon';
import ShareFooter from '../../components/footer/ShareFooter';
import { Product } from '../../type';
import { Helmet } from 'react-helmet-async';

function Detail() {
  // 상태 관리 ------------------------------------------------------

  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [share, setShare] = useState<boolean>(false);

  // 네비게이트(페이지 이동) ----------------------

  const navigate = useNavigate();

  // 파람스를 통해 productId 받아오기 -------------------------

  const params = useParams();

  // 해당 상품 데이터 불러오기 ----------------------------------------------

  const { status, data } = useQuery<Product, unknown>(['product', params.id], () => getProduct(params.id));

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 공유버튼 클릭 --------------------------------------------------------

  const handleShareButton = (): void => {
    setShare(!share);
  };

  // 천 단위 콤마 찍기 -------------------------------------------------------------------------

  const currentPrice: string | undefined = data?.currentPrice.toLocaleString();
  const originalPrice: string | undefined = data?.originalPrice.toLocaleString();

  // 로컬 스토리지 저장 -------------------------------------------------------------------------

  // * 로컬 스토리지에서 watched 항목 가져오기
  let watchedItems = localStorage.getItem('watched');
  // * 가져온 항목이 있을 시 JSON 파싱, 없을 시 빈 배열
  let watched = watchedItems ? JSON.parse(watchedItems) : [];
  // * Set으로 중복 값 제거
  let watchedSet = new Set(watched);
  // * 상품 id를 Set에 추가
  watchedSet.add(params.id);
  // * Set에서 배열로 반환
  watched = [...watchedSet];
  // * 배열을 로컬 스토리지에 watched 항목으로 다시 저장
  localStorage.setItem('watched', JSON.stringify(watched));

  // 화면 --------------------------------------------------------------------------------------

  return (
    <>
      <Helmet title={`내일은 최저가 | 상세페이지 | ${params.id}`} />
      <Wrap>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <svg xmlns='http://www.w3.org/2000/svg' width='17' height='18' viewBox='0 0 17 18' fill='none'>
              <path d='M9 1L1 9L9 17' stroke='#6F6F6F' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </BackButton>
          <h3>{data?.Category[0].categoryName}</h3>
          <XButton
            onClick={() => {
              navigate('/');
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path d='M18 6L6 18M18 18L6 6' stroke='#6F6F6F' strokeWidth='2' strokeLinecap='round' />
            </svg>
          </XButton>
        </Header>
        <Scroll>
          <ProductContent>
            <ProductImageWrap>
              <ProductImage src={data?.productImage}></ProductImage>
            </ProductImageWrap>
            <Content>
              <div className='title'>{data?.productName}</div>
              {data?.discountRate !== 0 ? <div className='originalPrice'>{originalPrice}원</div> : <div style={{ marginBottom: '10px' }}></div>}
              <PriceNDiscountWrap>
                <div>{currentPrice}원</div>
                {data?.discountRate !== 0 ? (
                  <DiscountWrap>
                    <div style={{ marginRight: '0.125rem' }}>
                      <svg xmlns='http://www.w3.org/2000/svg' width='13' height='9' viewBox='0 0 13 9' fill='none'>
                        <path
                          d='M5.73421 8.08811C6.13384 8.56399 6.86616 8.56399 7.26579 8.08811L12.0484 2.3931C12.5947 1.74247 12.1322 0.75 11.2826 0.75H1.71742C0.867809 0.75 0.405256 1.74247 0.951638 2.39309L5.73421 8.08811Z'
                          fill='#0C77F7'
                        />
                      </svg>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '700' }}>{data?.discountRate}%</div>
                  </DiscountWrap>
                ) : (
                  <div></div>
                )}
                <GreyShareIcon onClick={handleShareButton} style={{ position: 'absolute', right: '0rem', cursor: 'pointer' }} />
              </PriceNDiscountWrap>
            </Content>
          </ProductContent>
          <OptionModal realId={data?.realId} productId={data?.productId} />

          <PriceDataWrap minPrice={minPrice} maxPrice={maxPrice} />

          <ChartArea>
            <GraphText>가격 그래프</GraphText>
            <PriceChart id={params.id as string} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
          </ChartArea>

          <SimilarProductList productId={data?.productId} />

          <Message>구매하기 버튼을 통해 구매를 할 경우, '내일은 최저가'에 수익이 발생합니다. 발생한 수익은 가격 추적 서비스 운영을 위해 사용됩니다.</Message>
          <AlarmFooter productUrl={data?.productUrl} productId={params.id} isAlertOn={data?.isAlertOn} />
        </Scroll>
      </Wrap>
      <ShareFooter
        share={share}
        handleShareButton={handleShareButton}
        id={data?.productId}
        realId={data?.realId}
        title={data?.productName}
        mainImage={data?.productImage}
      />
    </>
  );
}

export default Detail;

const Wrap = styled.div`
  width: 375px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const Header = styled.div`
  width: 350px;
  height: 3.625rem;
  border-bottom: 0.0625rem solid rgba(217, 217, 217, 1);
  padding: 0.625rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding-left: 0.9375rem;
  position: relative;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 719px;
  }
`;

const BackButton = styled.div`
  position: absolute;
  left: 20px;
  cursor: pointer;
`;

const XButton = styled.div`
  position: absolute;
  right: 1rem;
  cursor: pointer;
  height: 1.5rem;
`;

const ProductImageWrap = styled.div`
  margin: 0.625rem 3.125rem;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: rgba(217, 217, 217, 1);
`;

const Scroll = styled.div`
  width: 375px;
  padding: 10px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }
  /* max-height: 75vh; */
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 100%;
  }
`;

const ProductContent = styled.div`
  padding-left: 10px;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 70%;
  }
  @media screen and (min-width: 744px) {
    width: 50%;
  }
`;

const Content = styled.div`
  min-height: 6.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 0.625rem;
  .title {
    font-size: 1.1875rem;
    font-weight: 600;
  }
  .originalPrice {
    font-size: 1rem;
    font-weight: 500;
    color: rgba(217, 217, 217, 1);
    text-decoration: line-through;
  }
`;

const PriceNDiscountWrap = styled.div`
  width: 20.9375rem;
  font-size: 1.375rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
  margin-top: -0.625rem;
  display: flex;
  flex-direction: row;
  align-items: end;
  position: relative;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 100%;
  }
`;

const DiscountWrap = styled.div`
  width: 3rem;
  height: 1.375rem;
  background-color: #9ecbff;
  border-radius: 0.1875rem;
  font-size: 0.6875rem;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #0c77f6;
  margin-left: 1.25rem;
`;

const GraphText = styled.div`
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.215em;
  margin-top: 1.125rem;
  margin-bottom: 0.9375rem;
`;

const Message = styled.div`
  width: 18.75rem;
  font-size: 0.625rem;
  color: lightgray;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const ChartArea = styled.div`
  margin-left: 0.625rem;
  margin-bottom: 1.875rem;
  width: 85%;
`;
