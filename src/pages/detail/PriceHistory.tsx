import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);
import styled from 'styled-components';

import Loading from '../../components/Loading';
import Error from '../../components/Error';

import { getPriceHistory } from '../../api/product';
import { PriceData, ChartData, PriceChartProps, PriceWrapProps, FormattedDataProps } from '../../type';

// 최고가, 최저가
export const PriceDataWrap: React.FC<PriceWrapProps> = ({ minPrice, maxPrice }) => {
  // 문자열로 변환 후 천 단위 쉼표 기재
  const semicolonMinPrice = minPrice != null ? minPrice.toLocaleString() : '0';
  const semicolonMaxPrice = maxPrice != null ? maxPrice.toLocaleString() : '0';

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

// 차트
export const PriceChart: React.FC<PriceChartProps> = ({ id, setMinPrice, setMaxPrice }) => {
  const { isLoading, isError, data } = useQuery<PriceData | undefined>('priceHistory', () => getPriceHistory(id));
  const [priceData, setPriceData] = useState<ChartData>({
    labels: [], // x축 초기화(날찌)
    datasets: [], //y축 초기화(가격)
  });
  const [_, setFormattedData] = useState<FormattedDataProps>({});

  // 날짜 형식 변경 (년월일 -> 월일)
  const DeleteYear = (date: string) => {
    const dateData = new Date(date);
    return `${dateData.getMonth() + 1}/${dateData.getDate()}`;
  };

  useEffect(() => {
    if (data?.priceHistoryForWeek) {
      const newFormattedData: { [key: string]: number } = {};
      // 객체의 각 항목 DeleteYear 사용해 newKey에 할당(11/10 형식)
      for (const [key, value] of Object.entries(data.priceHistoryForWeek)) {
        const newKey = DeleteYear(key);
        // newformattedData에 새로운 객체 만들어주고, value(가격)할당
        newFormattedData[newKey] = value;
      }
      setFormattedData(newFormattedData);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, 'rgba(0, 171, 249, 0.12)');
      gradient.addColorStop(1, 'rgba(0, 171, 249, 0)');

      const labels = Object.keys(newFormattedData); //x축

      const datasetData = Object.values(newFormattedData) as number[]; //y축

      setPriceData({
        labels: labels, //x축
        datasets: [
          //y축
          {
            label: '', //범례 지움
            data: datasetData,
            borderColor: '#00ABF9',
            borderWidth: 2,
            fill: true,
            backgroundColor: gradient,
          },
        ],
      });

      setMinPrice(data?.minPrice);
      setMaxPrice(data?.maxPrice);
    }
  }, [data, setMinPrice, setMaxPrice]);

  // 범례를 숨김
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return <Line data={priceData} options={options} />;
};

const PriceWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 90%;
  }
  @media screen and (min-width: 744px) {
    width: 90%;
  }
`;

const PriceArea = styled.div`
  width: 20.9375rem;
  height: 2.875rem;
  border: 0.0625rem solid #b5b5b5;
  border-radius: 0.625rem;
  display: flex;
  flex-shrink: 1;
  align-items: center;
  margin-bottom: 0.3125rem;
  padding-left: 0.1875rem;
  padding-right: 0.9375rem;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 92.2%;
    padding-left: 6px;
    padding-right: 0rem;
  }
  @media screen and (min-width: 744px) {
    width: 92.2%;
    padding-left: 6px;
    padding-right: 0rem;
  }
`;

const Text = styled.div`
  font-weight: 700;
  margin-left: 0.875rem;
`;

const LowestPrice = styled.div`
  color: #458fff;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 121.5%;
  margin-left: 5.3125rem;
`;

const HighestPrice = styled.div`
  color: #ff4545;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 121.5%;
  margin-left: 5.3125rem;
`;
