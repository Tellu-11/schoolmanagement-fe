 "use client"

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExamResultChart = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Teacher',
        data: [45, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
        fill: false,
        borderColor: 'rgb(147, 51, 234)',
        tension: 0.1
      },
      {
        label: 'Student',
        data: [35, 49, 60, 71, 46, 45, 30, 55, 49, 60, 71, 46],
        fill: false,
        borderColor: 'rgb(249, 115, 22)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'All Exam Result'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Exam Result</h2>
        <p className="text-sm text-gray-500">Students & Teacher</p>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ExamResultChart;