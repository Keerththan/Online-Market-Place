import React, { useEffect, useState } from "react";
import "./LoginRegister.css";
import "./Login.css";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaHome,
  FaCheck,
  FaRegAddressCard,
  FaPhone,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [provinceList, setProvinceList] = useState([]); // List of provinces
  const [selectedProvince, setSelectedProvince] = useState(""); // Selected province
  const [district, setDistrict] = useState(""); // Selected district
  const [districtData, setDistrictData] = useState({}); // Districts by province
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch provinces and districts
    const fetchData = async () => {
      const provinces = [
        "North",
        "NorthWestern",
        "Western",
        "NorthCentral",
        "Central",
        "Sabaragamuwa",
        "Eastern",
        "Uva",
        "Southern",
      ];
      const districts = {
        North: ["Jaffna", "Mullaitivu", "Vavuniya", "Kilinochchi", "Mannar"],
        NorthWestern: ["Puttalam", "Kurunegala"],
        Western: ["Colombo", "Gampaha", "Kalutara"],
        NorthCentral: ["Anuradhapura", "Polonnaruwa"],
        Central: ["Kandy", "Nuwara Eliya", "Matale"],
        Sabaragamuwa: ["Kegalle", "Ratnapura"],
        Eastern: ["Trincomalee", "Batticaloa", "Ampara"],
        Uva: ["Badulla", "Monaragala"],
        Southern: ["Galle", "Hambantota", "Matara"],
      };

      setProvinceList(provinces);
      setDistrictData(districts);
    };

    fetchData();
  }, []);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/backend/api/Home/register.php",
        {
          seller,
          buyer,
          selectedUserType,
          email,
          password,
          address,
          contactNumber,
          district,
        }
      );

      if (response.data) {
        const data = response.data;
        if (data.success) {
          setMessage("Registration request successfully sent");
          setMessageType("success");
          setTimeout(() => navigate("/"), 2000);
        } else {
          setMessage(data.message || "Registration failed");
          setMessageType("error");
        }
      } else {
        setMessage("Server error. Please try again later.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection.");
      setMessageType("error");
    }
  };

  return (
    <div className="login">
      <div className="homeHeader">
        <div className="homeHeaderLinks">
          <Link to="/" style={{ fontSize: "150%" }}>
            Home
          </Link>
          <Link to="/products" style={{ fontSize: "150%" }}>
            Products
          </Link>
          <Link to="/faqs" style={{ fontSize: "150%" }}>
            FAQs
          </Link>
          <Link to="/Login" style={{ fontSize: "150%" }}>
            Log in
          </Link>
        </div>
      </div>
      {message && (
        <div className={`message ${messageType} option`}>{message}</div>
      )}
      <div className="loginBody">
        <div className="homeBanner background-opacity">
          <div className="homePageContainer">
            <div className="homeBannerHeader form-box">
              <form onSubmit={handleRegisterSubmit} className="form">
                <h2 id="h1">Registration</h2>
               
                <div className="input-box">
                  <div className="option">
                    <select
                      id="userType"
                      value={selectedUserType}
                      onChange={(e) => setSelectedUserType(e.target.value)}
                      className="select"
                      required
                    >
                      <option value="" disabled>
                        Please choose a user type
                      </option>
                      <option value="Seller">Seller</option>
                      <option value="Buyer">Buyer</option>
                    </select>
                  </div>
                </div>
                {selectedUserType === "Seller" && (
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Seller Name"
                      value={seller}
                      onChange={(e) => setSeller(e.target.value)}
                      required
                    />
                    <FaHome className="icon" />
                  </div>
                )}
                {selectedUserType === "Buyer" && (
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Buyer Name"
                      value={buyer}
                      onChange={(e) => setBuyer(e.target.value)}
                      required
                    />
                    <FaHome className="icon" />
                  </div>
                )}
                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <FaEnvelope className="icon" />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <FaLock className="icon" />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <FaLock className="icon" />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <FaRegAddressCard className="icon" />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                  <FaPhone className="icon" />
                </div>
                <div className="input-box">
                  <div className="option">
                    <select
                      value={selectedProvince}
                      className="select"
                      onChange={(e) => {
                        setSelectedProvince(e.target.value);
                        setDistrict("");
                      }}
                      required
                    >
                      <option value="" disabled>
                        Select a Province
                      </option>
                      {provinceList.map((province, index) => (
                        <option key={index} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="input-box">
                  <div className="option">
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="select"
                      required
                      disabled={!selectedProvince}
                    >
                      <option value="" disabled>
                        Select a District
                      </option>
                      {districtData[selectedProvince]?.map((dist, index) => (
                        <option key={index} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit" className="submit">
                  Register
                </button>
              </form>
              <h1>EliteZ</h1>
              <div className="homeHeaderLogo">
                <div id="logoContainer">
                  <div id="ring"></div>
                  <div id="ring"></div>
                  <div id="ring"></div>
                  <div id="ring"></div>
                </div>
              </div>
              <p>Inventory Fulfillment and Distribution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
