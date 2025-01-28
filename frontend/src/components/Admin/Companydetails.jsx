import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import Requestcompany from "./Requestcompany";

function Companydetails() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRequestAddModal, setShowRequestAddModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [products, setProducts] = useState([]);

  const handleShowViewModal = async (company) => {
    setSelectedCompany(company);
    try {
      const response = await axios.post(
        "http://localhost:8080/backend/api/Admin/Listproducts.php",
        { companyOwnerID: company.companyOwnerID }
      );
      const jsonData = response.data;
      if (jsonData.error) {
        setError(jsonData.error);
      } else {
        setProducts(jsonData); // Assuming your PHP returns the product list directly
      }
    } catch (error) {
      setError(error.message);
    }
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);
  const handleShowRequestAddModal = () => setShowRequestAddModal(true);
  const handleCloseRequestAddModal = () => setShowRequestAddModal(false);
  const handleSaveAddModal = () => {
    // Fetch updated records here if necessary
    setShowRequestAddModal(false);
  };
  const [unreadRequestCount, setUnreadRequestsCount] = useState(0);

  const fetchCompany = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/backend/api/Admin/Listcompany.php"
      );
      const jsonData = await response.json();
      if (jsonData.success) {
        setCompany(jsonData.data);
      } else {
        setError(jsonData.message);
      }
      //window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
    // const intervalId = setInterval(() => {
    //   fetchCompany();
    // }, 1000);

    // // Clean up the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchUnreadRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/backend/api/Admin/requestcompanyCounts.php"
        );
        if (response.data.unreadCount !== undefined) {
          setUnreadRequestsCount(response.data.unreadCount);
        }
      } catch (error) {
        console.error("Error fetching unread messages:", error);
      }
    };

    fetchUnreadRequest();
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-11   col-lg-11">
          <div className="card">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <form className="d-flex" role="search">
                <input
                  className="form-control"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
              <h1 className="h4 text-center">Company Details</h1>
              <button
                className="btn btn-info text-dark m-2"
                onClick={handleShowRequestAddModal}
              >
                Company Request
                {unreadRequestCount > 0 && (
                  <div className="notification-badge">{unreadRequestCount}</div> // Notification Badge
                )}
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr style={{ fontSize: "105%" }}>
                      <th>Company Name</th>
                      <th>Company Owner Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company
                      .filter((company) => {
                        return search.toLowerCase() === ""
                          ? company
                          : company.companyName.toLowerCase().includes(search);
                      })
                      .map((company) => (
                        <tr
                          key={company.companyOwnerID}
                          style={{ fontSize: "55%" }}
                        >
                          <td>{company.companyName}</td>
                          <td>{company.companyOwnerName}</td>
                          <td>{company.email}</td>
                          <td>{company.companyContactNumber}</td>

                          <td className="d-flex justify-content-center">
                            <button
                              className="btn btn-primary me-1"
                              onClick={() => handleShowViewModal(company)}
                            >
                              View Products
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedCompany && (
        <Modal show={showViewModal} onHide={handleCloseViewModal}>
          <Modal.Header closeButton>
            <Modal.Title>Company Products</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontSize: "135%" }}>
            {products.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.productID}>
                      <td>{product.productID}</td>
                      <td>{product.productName}</td>
                      <td>Rs.{product.productPrice}</td>
                      <td>{product.productQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No products found for this company.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Requestcompany
        showRequestAddModal={showRequestAddModal}
        handleCloseRequestAddModal={handleCloseRequestAddModal}
        handleShowViewModal={handleShowViewModal}
      />
    </div>
  );
}

export default Companydetails;
