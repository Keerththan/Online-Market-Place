import React, { useState, useEffect } from 'react';
import { AiOutlineStock, AiOutlineUser } from 'react-icons/ai';
import { BsCartFill, BsTruck } from 'react-icons/bs';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Barchart from './Barchart';
import Piechart from './Piechart';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

const Dash = () => {
  const { sidebarToggle, setSidebarToggle } = useOutletContext();
  const [orderCount, setOrderCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [amount, setAmount] = useState(0);

  const fetchOrders = async () => {
    try {
      const response = await axios.post('http://localhost:8080/backend/api/Admin/count.php');
      const jsonData = response.data;
      setOrderCount(jsonData.orders);
      setCustomerCount(jsonData.customers);
      setCompanyCount(jsonData.company);
      setAmount(jsonData.amount);
    } catch (error) {
      console.error('Error fetching order count:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
<div className='container mt-5'>
    <div className='row d-flex justify-content-around'>
        <div className='col-md-3 col-sm-6 mb-4'>
          <div className='card border-0 shadow-sm rounded-4 text-center bg-primary text-white'>
            <div className='card-body'>
            <div className="d-flex justify-content-center align-items-center">
            <AiOutlineStock size={50} />&nbsp;
            <h5 className='card-title mt-3'>Company</h5>
            </div>
            <span className='display-6'>{companyCount}</span>
            </div>
          </div>
        </div>
        <div className='col-md-3 col-sm-6 mb-4'>
          <div className='card border-0 shadow-sm rounded-4 text-center bg-success text-white'>
            <div className='card-body'>
            <div className="d-flex justify-content-center align-items-center">
                <AiOutlineUser size={50} />&nbsp;
                <h5 className='card-title mt-3'>Customers</h5>
            </div>
            <span className='display-6'>{customerCount}</span>
            </div>
          </div>
        </div>
        <div className='col-md-3 col-sm-6 mb-4'>
          <div className='card border-0 shadow-sm rounded-4 text-center bg-info text-white'>
            <div className='card-body'>
            <div className="d-flex justify-content-center align-items-center">
                <BsCartFill size={50} />&nbsp;
                <h5 className='card-title mt-3'>Today Orders</h5>
            </div>
            <span className='display-6'>{orderCount}</span>
            </div>
          </div>
        </div>
        <div className='col-md-3 col-sm-6 mb-4'>
          <div className='card border-0 shadow-sm rounded-4 text-center bg-warning text-white'>
            <div className='card-body'>
            <div className="d-flex justify-content-center align-items-center">
            <BsTruck size={50} />&nbsp;
            <h5 className='card-title mt-3'>Today Sales</h5>
            </div>
              
              <span className='display-6'>${amount}</span>
            </div>
          </div>
        </div>
    </div>
    <div className='row justify-content-between mt-4'>
        <div className='col-lg-6 col-md-8 mb-4'>
          <div className='card shadow-lg p-4 bg-light rounded-4'>
            <div className='card-body'>
              <h4 className='text-center'>Number of Products</h4>
              <Barchart />
            </div>
          </div>
        </div>
        <div className='col-lg-5 col-md-7 mb-4'>
          <div className='card shadow-lg p-4 bg-light rounded-4'>
            <div className='card-body'>
              <h4 className='text-center'>Order & Delivery</h4>
              <Piechart />
            </div>
          </div>
        </div>
    </div>
</div>
  );
};

export default Dash;
