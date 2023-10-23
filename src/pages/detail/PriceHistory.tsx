import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { getPriceHistory } from '../../api/product';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);
import styled from 'styled-components';

interface PriceData {
  priceHistoryForWeek: any;
  maxPrice: number;
  minPrice: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
  }[];
}

interface PriceChartProps extends ParamsProps {
  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface ParamsProps {
  id: string | number;
}

export interface PriceWrapProps {
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

export const PriceDataWrap: React.FC<PriceWrapProps> = ({ minPrice, maxPrice }) => {
  // 문자열로 변환 후 천 단위 쉼표 기재
  const semicolonMinPrice = minPrice !== undefined ? minPrice.toLocaleString() : '0';
  const semicolonMaxPrice = maxPrice !== undefined ? maxPrice.toLocaleString() : '0';

  return (
    <PriceWrap>
      <PriceArea>
        <Text>최저가</Text>
        <LowestPrice>{semicolonMinPrice}원</LowestPrice>
      </PriceArea>
      <PriceArea>
        <Text>최고가</Text>
        <HighestPrice>{semicolonMaxPrice}원</HighestPrice>
      </PriceArea>
    </PriceWrap>
  );
};

export const PriceChart: React.FC<PriceChartProps> = ({ id, setMinPrice, setMaxPrice }) => {
  const { isLoading, isError, data } = useQuery<PriceData | undefined>('priceHistory', () => getPriceHistory(id));

  useEffect(() => {
    if (data) {
      setMinPrice(data?.minPrice);
      setMaxPrice(data?.maxPrice);
    }
  }, [data, setMinPrice, setMaxPrice]);

  console.log(data, '데이터 결과');
  console.log(data?.priceHistoryForWeek, 'pricehistoryforweek');

  const [priceData, setPriceData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Lowest Price',
        data: [],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    if (data) {
      const labels = Object.keys(data.priceHistoryForWeek);
      const datasetData = Object.values(data.priceHistoryForWeek) as number[];

      setPriceData({
        labels: labels,
        datasets: [
          {
            label: 'Price History',
            data: datasetData,
            borderColor: 'black',
            borderWidth: 2,
          },
        ],
      });
    }
  }, [data]);

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }

  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return <Line data={priceData} />;
};

const PriceWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriceArea = styled.div`
  width: 335px;
  height: 46px;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  display: flex;
  flex: shrink;
  align-items: center;
  margin-bottom: 10px;
`;

const Text = styled.div`
  margin-left: 14px;
`;

const LowestPrice = styled.div`
  color: #458fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 121.5%;
  margin-left: 85px;
`;

const HighestPrice = styled.div`
  color: #ff4545;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 121.5%;
  margin-left: 85px;
`;
