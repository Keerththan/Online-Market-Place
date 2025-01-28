import React, { useState, useEffect } from "react";
import { AiOutlineStock, AiOutlineUser } from "react-icons/ai";
import { BsCartFill, BsTruck } from "react-icons/bs"; //  using BsTruck for Delivery icon
import HomeCard from "./HomeCard";
import BarChart from "./BarChart";
import Order from "./Order";
import PieChart from "./PieChart.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export const CompanyDashboard = () => {
  const { sidebarToggle, setSidebarToggle } = useOutletContext();
  const { user } = useOutletContext(); // assuming user context contains companyOwnerID
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [deliveryCount, setDeliveryCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        if (user) {
          const response = await axios.post(
            "http://localhost:8080/backend/api/Company/counts.php",
            {
              companyOwnerID: user.companyOwnerID,
            }
          );

          if (response.data && !response.data.error) {
            setProductCount(response.data.products);
            setCustomerCount(response.data.customers);
            setOrderCount(response.data.orders);
            setDeliveryCount(response.data.delivery);
          } else {
            console.error("Error in response data:", response.data.error);
          }
        }
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchCounts();
  }, [user.companyOwnerID]);

  return (
    <div>
      <div className="container mt-5">
        <div className="row gy-4 justify-content-center ">
          <div className="col-12 col-sm-6 col-lg-3">
            <HomeCard
              title="Products"
              icon={AiOutlineStock}
              count={productCount}
              className="bg-primary text-white"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <HomeCard
              title="Customers"
              icon={AiOutlineUser}
              count={customerCount}
              className="bg-success text-white"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <HomeCard
              title="Orders"
              icon={BsCartFill}
              count={orderCount}
              className="bg-warning text-dark"
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <HomeCard
              title="Delivery"
              icon={BsTruck}
              count={deliveryCount}
              className="bg-danger text-white"
            />
          </div>
        </div>
      </div>

      <div className="row justify-content-center m-5">
        <div className="col-12 col-lg-7 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <BarChart />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 mb-4 ms-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <PieChart />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container mt-4 mb-3">
        <div className="row justify-content-center">
          <div className="w-full">
            <Order />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CompanyDashboard;
