import React from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../context/globalContext';
import { dateFormat } from '../utils/dateFormat';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const incomeLabels = incomes.map((i) => dateFormat(i.date));
  const expenseLabels = expenses.map((e) => dateFormat(e.date));
  const allLabels = [...new Set([...incomeLabels, ...expenseLabels])];

  const data = {
    labels: allLabels.length > 0 ? allLabels : ['No data'],
    datasets: [
      {
        label: 'Income',
        data: incomes.map((i) => i.amount),
        borderColor: '#42AD00',
        backgroundColor: 'rgba(66,173,0,0.15)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Expenses',
        data: expenses.map((e) => e.amount),
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255,0,0,0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Line data={data} options={options} />;
}

export default Chart;
