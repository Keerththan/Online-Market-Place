import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Addcustomer = ({ showAddModal, handleCloseAddModal, handleSaveAddModal }) => {
  const [inputs, setInputs] = useState({
    
    fname: "",
    email: "",
    contact: "",
    shopname: "",
    place: "",
    district: "",
    refno: ""
  });

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {fname, email, contact, shopname, place, district, refno } = inputs;

    try {
      const response = await axios.post('http://localhost:8080/backend/api/Admin/Addcustomer.php', { fname, email, contact, shopname, place, district, refno });
      const data = response.data;
      if (data.success) {
        alert("Customer added successfully");
        handleSaveAddModal();
        handleCloseAddModal();
      } else {
        alert("Error adding customer");
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error!");
    }
  };

  return (
    <Modal show={showAddModal} onHide={handleCloseAddModal} className=''>
      <Modal.Header closeButton>
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className=''>
          
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="fname" value={inputs.fname} onChange={handleInput} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" value={inputs.email} onChange={handleInput} required />
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="text" name="contact" value={inputs.contact} onChange={handleInput} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Shop Name</Form.Label>
            <Form.Control type="text" name="shopname" value={inputs.shopname} onChange={handleInput} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="place" value={inputs.place} onChange={handleInput} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>District</Form.Label>
            <Form.Control type="text" name="district" value={inputs.district} onChange={handleInput} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Reference No</Form.Label>
            <Form.Control type="text" name="refno" value={inputs.refno} onChange={handleInput} required />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Addcustomer;