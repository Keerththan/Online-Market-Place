import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ReplyIcon from "@mui/icons-material/Reply";
import CancelIcon from "@mui/icons-material/Cancel";
import { Modal, Form } from "react-bootstrap";

const MessageDetail = () => {
  const { contactID } = useParams();
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/backend/api/Company/Message/message_detail.php?contact_id=${contactID}`
        );
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        setMessage(response.data);
      } catch (err) {
        console.error(
          "API Error:",
          err.response ? err.response.data : err.message
        );
        setError("Error fetching Message details");
      } finally {
        setLoading(false);
      }
    };

    fetchMessageDetails();
  }, [contactID]);

  
  const handleReply = () => {
    setShowMessageModal(true);
    setSelectedCustomer(message);
  };


  const handleShowMessageModal = () => {
    setShowMessageModal(true);
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    setReplyMessage(""); // Reset message field
    setFile(null); // Reset file input
  };

  const handleCloseModal = () => {
    navigate('/company/messageList'); 
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault(); // Prevent submission first // Prevent submission first

    if (!replyMessage.trim()) {
      alert("Message field is required");
      return;
    }

    const formData = new FormData();
      formData.append("companyOwnerID", message.companyOwnerID);
      formData.append("customerID", selectedCustomer.customerID);
      formData.append("email", user.email);
      formData.append("companyName", message.companyName); // Assuming companyName is available in user context
      formData.append("customerName", selectedCustomer.customerName);
      formData.append("message", replyMessage);
      formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/backend/api/Company/Message/contact.php",
        formData
      );
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      handleCloseMessageModal();
    } catch (error) {
      alert("Error sending message: " + error.message);
    }
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading message details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!message) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="body1" color="textSecondary">
          No message details found!
        </Typography>
      </Container>
    );
  }

  return (
    <div className="maincontainer">
      <div className="table_heading"></div>
    <Container sx={{ mt: 5 }}>
      <Card variant="outlined">
      <div className="card-color">
    <CardContent>
      <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
        {message.customerName}
      </Typography>

      {/* Align "Created At" to the right */}
      <Typography variant="body1" sx={{ mt: 3, textAlign: "right", mr: 2 }}>
        <strong>Date :</strong>{" "}
        {new Date(message.date).toLocaleDateString()}
      </Typography>

      <Typography variant="body1" sx={{ mt: 4 ,ml: 4 }}>
        <strong sx={{ mr: 4 }}>Email :</strong> 
        <span style={{ paddingLeft: '70px' }}>{message.email}</span>
      </Typography>

      <Typography variant="body1" sx={{ mt: 3 ,ml: 4}}>
        <strong >Message :</strong>
         <span style={{ paddingLeft: '40px' }}>{message.message}</span>
      </Typography>

      <Typography variant="body1" sx={{ mt: 3, ml: 4 }}>
        <strong>View Data :</strong>{" "}<span style={{ paddingLeft: '30px' }}>
        {message.dataFile ? (
          <MuiLink href={message.dataFile} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" startIcon={<FileOpenIcon />}>
              Click Here!
            </Button>
          </MuiLink>
        ) : (
          "No data available"
        )}</span>
      </Typography>

      {/* Align the buttons in the center */}
      <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "center" }}>
        <Button
          variant="outlined"
          startIcon={<ReplyIcon />}
          onClick={handleReply}
        >
          Reply
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<CancelIcon />}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
      </Stack>
    </CardContent>
    </div>
  </Card>
  

     {/* Message Modal */}
      {selectedCustomer && (
      <Modal show={showMessageModal} onHide={handleCloseMessageModal}  centered > 
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "1.5rem" }}>
            Send Message to {selectedCustomer.customerName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem" }}>
                Company Name
              </Form.Label>
              <Form.Control type="text" value={message.companyName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem" }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem" }}>
                Customer Name
              </Form.Label>
              <Form.Control
                type="text"
                value={selectedCustomer.customerName}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem" }}>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Enter your message"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem" }}>
                Attach File
              </Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer >
          <Button 
            variant="secondary"
            onClick={handleCloseMessageModal}
            style={{ backgroundColor: "#6c757d", color: "white" }} 
             className="me-2"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitMessage}
            style={{ backgroundColor: "#007bff", color: "white" }} // Primary color
          >
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
      )}
    </Container>
    </div>
  );
};

export default MessageDetail;
