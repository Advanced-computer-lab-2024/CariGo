import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Import registerables

Chart.register(...registerables); // Register all components

const UserActivityChart = () => {
  const data = {
    labels: ['Advertisers', 'Sellers', 'Tour Guides'], // Sample categories
    datasets: [
      {
        label: 'Active Users',
        data: [10, 15, 5], // Sample data; replace with dynamic data if needed
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear', // Specify that this is a linear scale
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>User Activity Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default UserActivityChart;