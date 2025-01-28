import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: { display: true, text: "Order Status by Month" },
  },
};

export const Barchart = () => {
  const userContext = useOutletContext();
  const user = userContext.user;
  const [labels, setLabels] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [processingData, setProcessingData] = useState([]);
  const [deliveredData, setDeliveredData] = useState([]);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/backend/api/Company/bar_chart.php",
        { companyOwnerID: user.companyOwnerID }
      );

      const orderData = response.data.orderData; // Get the bar chart data
      const months = orderData.map((item) => item.order_month);
      const pending = orderData.map((item) => item.pending);
      const processing = orderData.map((item) => item.processing);
      const delivered = orderData.map((item) => item.delivered);

      setLabels(months);
      setPendingData(pending);
      setProcessingData(processing);
      setDeliveredData(delivered);

      // For pie chart, you can access response.data.counts['pending'], etc.
      console.log('Pie Chart Counts:', response.data.counts);

    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const data = {
    labels: labels,
    datasets: [
      { label: "Pending", data: pendingData, backgroundColor: "rgba(255, 99, 132, 0.85)" },
      { label: "Processing", data: processingData, backgroundColor: "rgba(54, 162, 235, 0.85)" },
      { label: "Delivered", data: deliveredData, backgroundColor: "rgba(75, 192, 192, 0.85)" },
    ],
  };

  return (
    <div className="d-flex justify-content-center w-100">
      <Bar options={options} data={data} />
    </div>
  );
};

export default Barchart;
