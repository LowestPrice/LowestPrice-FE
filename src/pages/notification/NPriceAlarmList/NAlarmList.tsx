import { useQuery } from 'react-query';
import NAralmtItem from './NAlarmItem';
import { getAlarms } from '../../../api/alarm';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

function NPriceAlarmList() {
  const { data, status } = useQuery('alarms', getAlarms);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <Error />;
  }
  console.log(data);
  return (
    <div>
      {data.map((item: AlarmItem, index: number) => {
        return <NAralmtItem key={index} {...item} />;
      })}
    </div>
  );
}

export default NPriceAlarmList;

export interface AlarmItem {
  alarmHistoryId: number; // 히스토리 번호
  productId: number; // 상품 번호
  alarmPrice: number; // 알림 설정한 가격(당장 사용X)
  originalPrice: number; //상품 원래 가격
  currentPrice: number; //상품 현재 가격
  productName: string; //상품 이름
  createdAt: string;
}
