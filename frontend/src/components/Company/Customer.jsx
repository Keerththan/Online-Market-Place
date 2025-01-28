import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FaSearch, FaEye} from "react-icons/fa";
import { BiSolidMessageEdit } from "react-icons/bi";
import { Modal, Button, Form } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

function Customer() {
  const { user } = useOutletContext(); // Assuming this provides companyOwnerID and companyName
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCustomer, setFilteredCustomer] = useState([]); // For storing filtered products
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [message, setMessage] = useState(""); // For message content
  const [file, setFile] = useState(null); // For file upload

  const handleShowViewModal = (customer) => {
    setSelectedCustomer(customer);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => setShowViewModal(false);

  const handleShowMessageModal = (customer) => {
    setSelectedCustomer(customer);
    setShowMessageModal(true);
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    setMessage(""); // Reset message field
    setFile(null); // Reset file input
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // File input
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault(); // Prevent submission first

    if (!message.trim()) {
      // You can show custom validation error or rely on native
      alert('Message field is required');
      return;
    }

    if (user && selectedCustomer) {
      const formData = new FormData();
      formData.append("companyOwnerID", user.companyOwnerID);
      formData.append("customerID", selectedCustomer.customerID);
      formData.append("email", user.email);
      formData.append("companyName", user.companyName); // Assuming companyName is available in user context
      formData.append("customerName", selectedCustomer.customerName);
      formData.append("message", message);
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:8080/backend/api/company/Message/contact.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message");
      } finally {
        handleCloseMessageModal();
      }
    }
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true); // Start loading
      try {
        if (user) {
          const response = await axios.post(
            "http://localhost:8080/backend/api/Company/customer_detail.php",
            {
              companyOwnerID: user.companyOwnerID,
            }
          );
          if (Array.isArray(response.data)) {
            setCustomers(response.data); // Assuming customer data is inside 'data'
            setFilteredCustomer(response.data); // Initially show all customers
          } else {
            setError("Error fetching customers");
          }
        }
      } catch (error) {
        setError("Error fetching customers");
      } finally {
        setLoading(false); // Stop loading  // Stop loading
      }
    };

    fetchCustomerData();
  }, [user.companyOwnerID]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredCustomer(customers); // Show all customers if search is empty
    } else {
      const filtered = customers.filter((customer) =>
        customer.customerName
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        customer.customerShopName
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        customer.customerDistrict
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setFilteredCustomer(filtered);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="maincontainer">
      <div className="table_heading">
        <h3>Customer Details</h3>
        {/* Search bar and icon */}
        <div className="search_container">
          <input
            type="text"
            placeholder="Search by customer name"
            value={searchTerm}
            onChange={handleSearch}
            className="search_input"
          />
          <FaSearch className="search_icon" />
        </div>
      </div>
      <section className="display_details">
        {filteredCustomer.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Customer Name</th>
                <th>Shop Name</th>
                <th>Email</th>
                <th>District</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomer.map((customer, index) => (
                <tr key={customer.customerID}>
                  <td>{index + 1}</td>
                  <td>{customer.customerName}</td>
                  <td>{customer.customerShopName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.customerDistrict}</td>
                  <td>
                    <button
                      className="btn btn-primary me-1"
                      onClick={() => handleShowViewModal(customer)}
                    >
                      {/* <FaEye /> */}
                      view
                    </button>
                    <button
                      className="btn btn-info me-1 customer-btn"
                      onClick={() => handleShowMessageModal(customer)}
                    >
                      <BiSolidMessageEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Total Customers: {filteredCustomer.length}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <div className="empty_text">No Customers Available</div>
        )}
      </section>

      {/* View Modal */}
      {selectedCustomer && (
        <Modal show={showViewModal} onHide={handleCloseViewModal}>
          <Modal.Header closeButton>
            <Modal.Title>View Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontSize: "135%" }}>
            <p>
              <strong>ID:</strong> {selectedCustomer.customerID}
            </p>
            <p>
              <strong>Name:</strong> {selectedCustomer.customerName}
            </p>
            <p>
              <strong>Shop Name:</strong> {selectedCustomer.customerShopName}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Contact Number:</strong> {selectedCustomer.customerContactNumber}
            </p>
            <p>
              <strong>Address:</strong> {selectedCustomer.customerAddress}
            </p>
            <p>
              <strong>District:</strong> {selectedCustomer.customerDistrict}
            </p>
            <p>
              <strong>Reference No:</strong>{" "}
              {selectedCustomer.customerShopReferenceNo}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Message Modal */}
      {selectedCustomer && (
        <Modal show={showMessageModal} onHide={handleCloseMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.5rem' }}>Send Message to {selectedCustomer.customerName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '1.2rem' }}>Company Name</Form.Label>
              <Form.Control type="text" value={user.companyName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '1.2rem' }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '1.2rem' }}>Customer Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedCustomer.customerName}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '1.2rem' }}>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '1.2rem' }}>Attach File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMessageModal}> 
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitMessage}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
      
      )}
    </div>
  );
}

export default Customer;
