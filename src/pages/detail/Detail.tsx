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
import { ChartArea } from './style';
import { PriceChart, PriceDataWrap } from './PriceHistory';
import SimilarProductList from './similar/SimilarProductList';
import { GreyShareIcon } from '../../assets/icon/icon';
import ShareFooter from '../../components/footer/ShareFooter';

function Detail() {
  // 상태 관리 ------------------------------------------------------

  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [share, setShare] = useState<boolean>(false);

  // 네비게이트(페이지 이동) ----------------------

  const navigate = useNavigate();

  // 파람스를 통해 productId 받아오기 -------------------------

  const params = useParams();

  // 해당 상품 데이터 불러오기 ----------------------------------------------

  const { status, data } = useQuery(['product', params.id], () => getProduct(params.id), { enabled: !!params.id });
  console.log(data, '상품 데이터');

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 옵션(셀렉트)모달 켜고 닫기 ------------------------------------------------------------

  const handleOptionModalButton = () => {
    setIsOpenOption(!isOpenOption);
  };

  // 옵션(셀렉트)모달 켜고 닫기 ------------------------------------------------------------

  const OffOptionModal = () => {
    setIsOpenOption(false);
  };

  // 옵션 버튼 선택시 페이지 이동 --------------------------------------------------------------

  const handleOptionButton = (productId: number) => {
    console.log('click', productId);

    navigate(`/detail/${productId}`);
    // history.push(`/detail/${productId}`);
  };

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
      <div
        style={{ paddingBottom: '110px' }}
        onClick={() => {
          OffOptionModal();
        }}
      >
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
        <OptionWrap>
          <Option
            onClick={(e) => {
              e.stopPropagation();
              handleOptionModalButton();
            }}
          >
            제품 옵션 선택
            <div>
              <svg xmlns='http://www.w3.org/2000/svg' width='14' height='13' viewBox='0 0 14 13' fill='none'>
                <path d='M1 6L7 12L13 6' stroke='black' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </div>
          </Option>
          <OptionModal handleOptionButton={handleOptionButton} productId={data.productId} isOpenOption={isOpenOption} realId={data.realId}></OptionModal>
        </OptionWrap>
        {/* 최고가, 최저가 */}
        <PriceDataWrap minPrice={minPrice} maxPrice={maxPrice} />
        <ChartArea>
          <GraphText>가격 그래프</GraphText>
          <PriceChart id={params.id as string} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
        </ChartArea>
        <SimilarProuctWrap>
          <div className='title'>해당 상품과 비슷한 상품</div>
          <SimilarProductList productId={data.productId} />
        </SimilarProuctWrap>
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

const SimilarProuctWrap = styled.div`
  width: 546.35px;
  height: 195px;
  gap: 14px;
  margin-left: 10px;
  .title {
    width: 179px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const OptionWrap = styled.div`
  width: 375px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Option = styled.div`
  width: 335px;
  height: 46px;
  border-radius: 10px;
  border: 1px solid #b5b5b5;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 18px;
  position: relative;
  cursor: pointer;
  font-weight: 600;
  div {
    position: absolute;
    right: 14px;
    height: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const GraphText = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 121.5%;
  margin-top: 18px;
  margin-bottom: 15px;
`;
