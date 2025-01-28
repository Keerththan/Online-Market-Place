import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext, Link } from "react-router-dom";

const MessageCard = () => {
  const { user } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessageData();
  }, [user.customerID]);

  const fetchMessageData = async () => {
    setLoading(true); // Start loading state

    try {
      if (user && user.customerID) {
        const response = await axios.post(
          "http://localhost:8080/backend/api/Customer/Message/message_list.php",
          {
            customerID: user.customerID,
          }
        );

        if (Array.isArray(response.data)) {
          setMessages(response.data);
          setError(null); // Clear any previous errors
        }
      } else {
        setError("User data is missing or invalid.");
      }
    } catch (error) {
      setError(
        error.response
          ? error.response.data.error || "Error fetching messages"
          : "Network error: Unable to reach the server"
      );
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  const markAsRead = async (contactID) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/backend/api/Customer/Message/message_read.php",
        {
          contactID: contactID,
        }
      );
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="table_head">
        <h1 className="text-center my-3">Message Details</h1>
      </div>
      <div className="container">
        <div className="row">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div className="col-md-6 mb-2 mt-3" key={message.contactID}>
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">
                      {message.companyName}
                    </h5>
                    <p className="card-text text-end">
                      Date: {new Date(message.date).toLocaleDateString()}
                    </p>
                    <p className="card-text">Email: {message.email}</p>
                    <p className="card-text">
                      Message:{" "}
                      {message.message.split(" ").slice(0, 6).join(" ") +
                        (message.message.split(" ").length > 6 ? "..." : "")}
                    </p>
                    <Link
                      to={`/customer/message-info/${message.contactID}`}
                      className={`btn mt-auto w-40 ml-auto ${
                        message.isRead ? "btn-danger" : "btn-success"
                      }`}
                      style={{ marginLeft: "auto" }}
                      onClick={() => markAsRead(message.contactID)}
                    >
                      {message.isRead ? "Viewed" : "Read more"}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
