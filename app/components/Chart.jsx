import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [order, setOrder] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("/api/purchases/permonth")
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
        const labels = data.map((item) => item.month);
        const orders = data.map((item) => item.totalAmount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Purchases per Month",
              data: orders,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching buyers:", error));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Purchase per Month",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price of Orders",
        },
      },
    },
  };

  return chartData ? <Bar data={chartData} options={options} /> : null;
};

export default Chart;
