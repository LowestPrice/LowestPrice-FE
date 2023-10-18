import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { getPriceHistory } from '../../api/product';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

interface PriceData {
  priceHistoryForWeek: any;
  maxPrice: number;
  minPrice: number;
}

interface ChartData {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      borderColor: string;
      borderWidth: number;
    }
  ];
}

interface ParamsProps {
  id: string | number;
}

export const PriceChart: React.FC<ParamsProps> = ({ id }) => {
  const { isLoading, isError, data } = useQuery<PriceData | undefined>('priceHistory', () => getPriceHistory(id));
  const [chartOptions, setChartOptions] = useState<any>(null);
  // console.log(data, 'data');

  const [priceData, setPriceData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'price history',
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

      const minPrice = Math.min(...datasetData);
      const maxPrice = Math.max(...datasetData);

      // x축에서 최솟값과 최댓값의 위치 찾기
      const xValueForMin = labels[datasetData.indexOf(minPrice)];
      const xValueForMax = labels[datasetData.indexOf(maxPrice)];

      setChartOptions({
        plugins: {
          annotation: {
            drawTime: 'afterDatasetsDraw',
            annotations: {
              minLabel: {
                type: 'line',
                scaleID: 'y', // y축에 위치하게 함
                value: minPrice,
                // borderColor: 'red',
                // borderWidth: 1,
                label: {
                  enabled: true,
                  content: `최솟값: ${minPrice}`,
                  position: 'end',
                },
              },
              maxLabel: {
                type: 'line',
                scaleID: 'y', // y축에 위치하게 함
                value: maxPrice,
                // borderColor: 'green',
                // borderWidth: 1,
                label: {
                  enabled: true,
                  content: `최댓값: ${maxPrice}`,
                  position: 'start',
                },
              },
            },
          },
        },
      });

      setPriceData({
        labels: labels,
        datasets: [
          {
            label: '',
            data: datasetData,
            borderColor: 'black',
            borderWidth: 2,
          },
        ],
      });
    }
  }, [data]);

  if (isLoading) return <h1>로딩중입니다</h1>;
  if (isError) return <h1>에러가 발생했습니다.</h1>;

  return <Line data={priceData} options={chartOptions || {}} />;
};
