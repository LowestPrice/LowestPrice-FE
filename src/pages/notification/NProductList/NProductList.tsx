import { useQuery } from 'react-query';
import NProductItem from './NProductItem';
import { getAlarmProducts } from '../../../api/alarm';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { Product } from '../../../type';
import styled from 'styled-components';

export default function NProductList() {
  const { status, data } = useQuery('alarmProducts', getAlarmProducts);
  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  console.log(data);
  return (
    <Wrap>
      {data.map((item: Product, index: number) => {
        return <NProductItem key={index} {...item} />;
      })}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 380px;
  max-height: 683px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: rgba(181, 181, 181, 1);

    border-radius: 10px;
  }

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
