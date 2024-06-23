// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ dataDict }) => {
  const labels = Object.keys(dataDict);
  const dataValues = Object.values(dataDict);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sample Data',
        data: dataValues,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
