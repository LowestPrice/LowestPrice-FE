import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getOptions } from '../../../api/product';

import OptionModalItem from './OptionModalItem';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { useNavigate } from 'react-router';

interface Props {
  realId: string;
  productId: number;
}

function OptionModal(props: Props) {
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
    <div>
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
    </div>
  );
}

export default OptionModal;

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

const Wrap = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 84px;
  right: 39px;
  border: 1px solid #b5b5b5;
  z-index: 10;
  width: 300px;
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
