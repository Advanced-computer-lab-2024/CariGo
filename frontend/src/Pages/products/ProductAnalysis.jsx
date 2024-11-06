import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2"; // Use Bar instead of Line
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables); // Register all components

const ProductAnalysis = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/cariGo/purchase/productPurchases/6727e23a1335caa450eb86f3"
        );
        const purchases = response.data.Purchases;

        // Calculate the past five months
        const currentDate = new Date();
        const pastFiveMonths = Array.from({ length: 5 }, (_, i) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        }).reverse();

        // Process purchases data to group by month and sum quantities
        const monthlyData = purchases.reduce((acc, purchase) => {
          const date = new Date(purchase.createdAt);
          const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

          if (!acc[month]) {
            acc[month] = 0;
          }
          acc[month] += purchase.Quantity;
          return acc;
        }, {});

        // Filter and map monthly data for the past five months only
        const quantities = pastFiveMonths.map((month) => monthlyData[month] || 0);

        setChartData({
          labels: pastFiveMonths, // e.g., ["2024-07", "2024-08", "2024-09", "2024-10", "2024-11"]
          datasets: [
            {
              label: "Monthly Purchases",
              data: quantities,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      }
    };

    fetchPurchaseData();
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  return (
    <div>
      <h2>Monthly Purchases Chart (Past 5 Months)</h2>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ProductAnalysis;
