import 'bootstrap/dist/css/bootstrap.min.css';
{/*import necessary modules*/}
import React, { useState } from 'react'
import { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import axios from 'axios';


{/*react chart.js components---
  Registers the components from chart.js that you will use in your charts. 
  This is necessary to use chart.js within React.*/}
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
{/*Chart Configuration (options):*/}
const options = {
  responsive:true,
  plugins:{
    legend:{
      position:'bottom'
    },
    title:{
      display:true,
      text:''
    }
  }
}
{/*x-axis--label*/}
{/* An array of datasets to be displayed in the bar chart--datasets*/}


    
   


function Barchart() {

  const[labels, setLabels] = useState([]);
  const[products, setProducts] = useState([]);

  useEffect(()=>{
    fetch();
  }, []);
  
    const fetch = async() => {
      try {
        const response = await axios.post("http://localhost:8080/backend/api/Admin/barchart.php");
        console.log(response);
        const responsedata = response.data;
        console.log(responsedata);
        const data2 = responsedata.data;
        console.log(data2);
        if(Array.isArray(data2)){
          const companyNames = data2.map(item =>item.companyName);
          const productCounts = data2.map(item => item.productCount);
          console.log(companyNames);
          console.log(productCounts);

          setLabels(companyNames);
          setProducts(productCounts);
        } else{
          console.error("The response data is not an array");
        }
      } catch (error) {
        console.error("Erroe fetching chart data:",error);
      }
      
     

    }

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Company',
        data: products,
        backgroundColor: 'rgba(105, 59, 202, 0.85)',
        borderWidth: 1
      }]
    }

  return (
    
    <div className='d-flex  justify-content-center w-100'>
      <Bar options ={options} data ={data} />
     
      
    </div>
  )
}

export default Barchart