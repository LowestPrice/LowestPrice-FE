import styled from 'styled-components';
import OptionModalItem from './OptionModalItem';
import { useQuery } from 'react-query';
import { getOptions } from '../../../api/product';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

interface Props {
  realId: string;
  isOpenOption: boolean;
  productId: number;
  handleOptionButton: any;
}

function OptionModal(props: Props) {
  // 상품옵션 데이터 가져오기 ----------------------------------------------------

  const { status, data } = useQuery('options', () => getOptions(props.realId));

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 옵션 데이터 5개로 추리기 -------------------------------

  // const optionList = [];
  // for (let i = 0; i < 5; i++) {
  //   optionList.push(data[Math.floor(Math.random() * 5)]);
  // }

  const withoutOptionList = [...data].filter((it) => it.productId !== props.productId);

  //? 화면 -------------------------------------------------------

  return (
    <div>
      <Wrap $isOpen={props.isOpenOption}>
        {withoutOptionList.map((item, index) => {
          return <OptionModalItem key={index} {...item} handleOptionButton={props.handleOptionButton} />;
        })}
      </Wrap>
    </div>
  );
}

export default OptionModal;

const Wrap = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 84px;
  right: 39px;
  width: 335px;
  border: 1px solid #b5b5b5;
  z-index: 10;
  width: 300px;
  /* opacity: 0; */
  /* opacity: ${($isOpen) => ($isOpen ? '100' : '0')}; */
  /* height: ${($isOpen) => ($isOpen ? '50px' : '400px')}; */
`;
