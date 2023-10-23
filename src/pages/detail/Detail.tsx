import styled from 'styled-components';

import { getProduct } from '../../api/product';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Loading from '../../components/Loading';
import Error from '../../components/Error';
import SimilarProduct from './SimilarProduct';

import { BsCaretDownFill } from 'react-icons/bs';
import { BsChevronDown } from 'react-icons/bs';
import OptionModal from './option/OptionModal';
import AlarmFooter from '../../components/footer/AlarmFooter';
import { useState } from 'react';

import { ChartArea } from './style';
import { PriceDataWrap, PriceChart } from './PriceHistory';

function Detail() {
  // 상태 관리 ------------------------------------------------------
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  // 최고가, 최저가
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

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

  const currentPrice = data.currentPrice.toLocaleString();
  const originalPrice = data.originalPrice.toLocaleString();

  return (
    <>
      <div
        style={{ paddingBottom: '40px' }}
        onClick={() => {
          OffOptionModal();
        }}
      >
        <Header>
          <h3>{data.Category[0].categoryName}</h3>
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
              <div style={{ marginTop: '5px' }}>
                <BsCaretDownFill size='16' />
              </div>
              <div>{data.discountRate}%</div>
            </DiscountWrap>
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
              <BsChevronDown color='#B1B1B1' size='20' />
            </div>
          </Option>
          <OptionModal handleOptionButton={handleOptionButton} productId={data.productId} isOpenOption={isOpenOption} realId={data.realId}></OptionModal>
        </OptionWrap>
        {/* 최고가, 최저가  */}
        <PriceDataWrap minPrice={minPrice} maxPrice={maxPrice} />
        {/* 차트 */}
        <ChartArea>
          <div>가격 그래프</div>
          <PriceChart id={params.id as string} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
        </ChartArea>
        <SimilarProuctWrap>
          <div className='title'>해당 상품과 비슷한 상품</div>
          <SimilarProductList>
            <SimilarProduct />
            <SimilarProduct />
            <SimilarProduct />
            <SimilarProduct />
            <SimilarProduct />
          </SimilarProductList>
        </SimilarProuctWrap>
      </div>
      <AlarmFooter productUrl={data.productUrl} />
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
  .title {
    width: 179px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const SimilarProductList = styled.div`
  width: 375px;
  height: 185px;
  margin-top: 14px;
  display: flex;
  flex-direction: row;
  gap: 15px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 10%; /* 스크롤바의 길이 */
    height: 5px;
    background: rgba(181, 181, 181, 1);
    border-radius: 10px;
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
  div {
    position: absolute;
    right: 20px;
    margin-top: 5px;
  }
`;
