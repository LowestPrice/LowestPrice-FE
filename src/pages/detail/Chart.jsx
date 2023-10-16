import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import React from 'react';

const Chart = ({chartData}) => {
  return <Chart data={chartData} options={}/>;
};
// 차트에서 사용할 데이터, 옵션 props로 만들어주기

export default Chart;
