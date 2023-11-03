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

  const { status, data } = useQuery(['product', params.id], () => getProduct(params.id), { enabled: !!params.id });

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 공유버튼 클릭 --------------------------------------------------------

  const handleShareButton = () => {
    setShare(!share);
  };

  // 천 단위 콤마 찍기 -------------------------------------------------------------------------

  const currentPrice = data.currentPrice.toLocaleString();
  const originalPrice = data.originalPrice.toLocaleString();

  // 화면 --------------------------------------------------------------------------------------

  return (
    <>
      <div style={{ paddingBottom: '110px' }}>
        <Header>
          <h3>{data.Category[0].categoryName}</h3>
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
          <ProductImageWrap>
            <ProductImage src={data.productImage}></ProductImage>
          </ProductImageWrap>
          <Content>
            <div className='title'>{data.productName}</div>
            <div className='originalPrice'>{originalPrice}원</div>
            <PriceNDiscountWrap>
              <div>{currentPrice}원</div>
              <DiscountWrap>
                <div style={{ marginRight: '2px' }}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='13' height='9' viewBox='0 0 13 9' fill='none'>
                    <path
                      d='M5.73421 8.08811C6.13384 8.56399 6.86616 8.56399 7.26579 8.08811L12.0484 2.3931C12.5947 1.74247 12.1322 0.75 11.2826 0.75H1.71742C0.867809 0.75 0.405256 1.74247 0.951638 2.39309L5.73421 8.08811Z'
                      fill='#0C77F7'
                    />
                  </svg>
                </div>
                <div>{data.discountRate}%</div>
              </DiscountWrap>
              <GreyShareIcon onClick={handleShareButton} style={{ position: 'absolute', right: '0px', cursor: 'pointer' }} />
            </PriceNDiscountWrap>
          </Content>
          <OptionModal realId={data.realId} productId={data.productId} />
          {/* 최고가, 최저가 */}
          <PriceDataWrap minPrice={minPrice} maxPrice={maxPrice} />
          <ChartArea>
            <GraphText>가격 그래프</GraphText>
            <PriceChart id={params.id as string} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
          </ChartArea>
          <SimilarProductList productId={data.productId} />
          <Message>구매하기 버튼을 통해 구매를 할 경우, '내일은 최저가'에 수익이 발생합니다. 발생한 수익은 가격 추적 서비스 운영을 위해 사용됩니다.</Message>
        </Scroll>
      </div>
      <ShareFooter
        share={share}
        handleShareButton={handleShareButton}
        id={data.productId}
        realId={data.realId}
        title={data.productName}
        mainImage={data.productImage}
      />
      <AlarmFooter productUrl={data.productUrl} productId={params.id} isAlertOn={data.isAlertOn} />
    </>
  );
}

export default Detail;

const Header = styled.div`
  height: 58px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  padding: 10px;
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  position: relative;
`;

const XButton = styled.div`
  position: absolute;
  right: 16px;
  cursor: pointer;
  height: 24px;
`;

const ProductImageWrap = styled.div`
  padding: 10px 50px 10px 50px;
  position: relative;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  background-color: rgba(217, 217, 217, 1);
`;

const Content = styled.div`
  width: 375px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  .title {
    width: 335px;
    font-size: 19px;
    font-weight: 600;
  }
  .originalPrice {
    width: 335px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(217, 217, 217, 1);
    text-decoration: line-through;
  }
`;

const PriceNDiscountWrap = styled.div`
  width: 335px;
  font-size: 22px;
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
  margin-top: -10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const DiscountWrap = styled.div`
  width: 48px;
  height: 22px;
  background-color: #9ecbff;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #0c77f6;
  margin-left: 20px;
`;

const GraphText = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 121.5%;
  margin-top: 18px;
  margin-bottom: 15px;
`;

const Message = styled.div`
  width: 300px;
  font-size: 10px;
  color: lightgray;
  margin-top: 70px;
  margin-bottom: -20px;
`;

const ChartArea = styled.div`
  margin-left: 10px;
  margin-bottom: 30px;
`;

const Scroll = styled.div`
  width: 23.75rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 75vh;
`;
