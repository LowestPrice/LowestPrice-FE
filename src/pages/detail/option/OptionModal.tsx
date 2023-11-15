import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { getOptions } from '../../../api/product';

import OptionModalItem from './OptionModalItem';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

interface Props {
  realId: string | undefined;
  productId: number | undefined;
}

function OptionModal(props: Props) {
  // 옵션(셀렉트) 모달 on/off 상태 관리 -------------------------------------

  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);

  const navigate = useNavigate();

  // 상품옵션 데이터 가져오기 ----------------------------------------------------

  const { status, data } = useQuery('options', () => getOptions(props.realId));

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

  // 옵션 버튼 선택시 페이지 이동 --------------------------------------------------------------

  const handleOptionButton = (productId: number) => {
    navigate(`/detail/${productId}`);
    // history.push(`/detail/${productId}`);
  };

  // 해당상품 제외시키기 ---------------------------------------------------------------

  const withoutOptionList = [...data].filter((it) => it.productId !== props.productId);

  // 화면 ===============================================================================

  return (
    <Wrapper>
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
        {withoutOptionList.length !== 0 ? (
          <Wrap $isOpen={isOpenOption}>
            {withoutOptionList.map((item, index) => {
              return <OptionModalItem key={index} {...item} handleOptionButton={handleOptionButton} />;
            })}
          </Wrap>
        ) : (
          <div></div>
        )}
      </OptionWrap>
    </Wrapper>
  );
}

export default OptionModal;

const Wrapper = styled.div`
  width: 90%;
`;

const OptionWrap = styled.div`
  width: 339px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 100%;
  }
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
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 90%;
  }
  @media screen and (min-width: 744px) {
    width: 90%;
  }
`;

const Wrap = styled.div<{ $isOpen: boolean }>`
  width: 90%;
  position: absolute;
  top: 84px;
  border: 1px solid #b5b5b5;
  z-index: 10;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  height: ${(props) => (props.$isOpen ? 'auto' : '0px')};
  max-height: 250px;
  overflow: scroll;
  transition: all 400ms ease-in-out 0s;
  border-radius: 10px;
`;
