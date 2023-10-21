import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { getPriceHistory } from '../../api/product';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

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

interface ParamsProps {
  id: string | number;
}

export const PriceChart: React.FC<ParamsProps> = ({ id }) => {
  // console.log(id, 'id값이 나올까?');
  const { isLoading, isError, data } = useQuery<PriceData | undefined>('priceHistory', () => getPriceHistory(id));

  console.log(data, '데이터 결과');
  //   console.log(data?.maxPrice, 'maxprice');
  //   console.log(data?.minPrice, 'maxprice');
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
