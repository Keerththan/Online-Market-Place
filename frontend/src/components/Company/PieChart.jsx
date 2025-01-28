import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend, Tooltip, Title } from 'chart.js';
import axios from 'axios'; // Make sure to import axios // Make sure to import axios
import { useOutletContext } from 'react-router-dom';

ChartJS.register(ArcElement, Legend, Tooltip, Title);

export const PieChart= () => {
  const userContext = useOutletContext();
  const user = userContext.user; 
  const [pendingCount, setPendingCount] = useState(0);
  const [processingCount, setProcessingCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  

  useEffect(() => {
    const fetchCounts = async () => {
      console.log('User:', user);
    console.log('companyOwnerID:',user.companyOwnerID);
      if (user) {
        try {
          const response = await axios.post('http://localhost:8080/backend/api/Company/counts.php', { 
            companyOwnerID: user.companyOwnerID }
          );
          if (response.data && !response.data.error) {
            setProcessingCount(response.data.processing);
            setPendingCount(response.data.pending);
            setDeliveredCount(response.data.delivered);
          } else {
            console.error('Error in response data:', response.data.error);
          }
        } catch (error) {
          console.error('Error fetching counts:', error);
        }
      } else {
        console.error('companyOwnerID is missing');
      }
    };
  
    fetchCounts();
  }, [user.companyOwnerID]);
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Status',
      },
    },
  };

  // Dynamic data for the pie chart
  const data = {
    labels: ['Processing', 'Pending', 'Delivered'], 
    datasets: [
      {
        label: 'Order Status',
        data: [processingCount, pendingCount, deliveredCount],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)', // Processing
          'rgba(255, 99, 132, 0.5)', // Pending
          'rgba(75, 192, 192, 0.5)', // Delivered
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)', // Processing
          'rgba(255, 99, 132, 1)', // Pending
          'rgba(75, 192, 192, 1)', // Delivered
        ],
        borderWidth: 1,
      },
    ],
  };
  

  

  return (
    <div className="d-flex justify-content-center" style={{ height: '100%', maxHeight: '400px' }}>
      <div style={{ width: '100%', maxWidth: '400px', height: '100%', position: 'relative' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default PieChart;
