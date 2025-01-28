import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './orderSuccess.css'; // Import your CSS file

function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const { invoice, totalAmount, paymentMethod, cardDetails, customer_id } = location.state;

    const formattedExpiryDate = cardDetails?.expiryDate instanceof Date 
    ? `${cardDetails.expiryDate.getMonth() + 1}/${cardDetails.expiryDate.getFullYear()}` 
    : cardDetails?.expiryDate;

    return (
        <div className="order-success-container">
            <div className="order-success-card">
                <div className="order-success-body">
                    <h2 className="order-success-title">Order Successful!</h2>
                    <p className="order-success-message">Your payment was successfully processed.</p>

                    <h5 className="order-detail"><strong>Invoice ID:</strong> {invoice.orderID}</h5>
                    <h5 className="order-detail"><strong>Total Amount Paid:</strong> Rs. {totalAmount}</h5>
                    <h5 className="order-detail"><strong>Payment Method:</strong> {paymentMethod === 'credit_card' ? 'Credit Card' : 'Cash on Delivery'}</h5>

                    {paymentMethod === 'credit_card' && cardDetails && (
                        <div>
                            <h5 className="card-detail">Card Number: **** **** **** {cardDetails.cardNumber.slice(-4)}</h5>
                            <p className="card-detail">Expiry Date: {formattedExpiryDate}</p>
                        </div>
                    )}
                    <div className="invoice-details-card">
                        <div className="invoice-header">
                            <h5 className="invoice-title">Invoice Details</h5>
                        </div>
                        <div className="invoice-body">
                            <p className="invoice-detail"><strong>Customer ID:</strong> {customer_id}</p>
                            <p className="invoice-detail"><strong>Total Amount:</strong> Rs. {totalAmount}</p>

                            <table className="invoice-table">
                                <thead>
                                    <tr>
                                        <th className="invoice-table-header">Product Name</th>
                                        <th className="invoice-table-header">Price</th>
                                        <th className="invoice-table-header">Quantity</th>
                                        <th className="invoice-table-header">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="invoice-table-cell">{item.productName}</td>
                                            <td className="invoice-table-cell">{item.price}</td>
                                            <td className="invoice-table-cell">{item.quantity}</td>
                                            <td className="invoice-table-cell">Rs. {item.price * item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button
                                className="btn btn-secondary mt-2"
                                onClick={() => navigate('/customer/CartItems')}
                            >
                                Back to Cart
                            </button>
                            <button
                                className=" btn btn-primary mx-2 mt-2"
                                onClick={() => navigate('/customer/orders')}
                            >
                                View Orders
                            </button>
                        </div>
                    </div>

                    <button className="navigation-button" onClick={() => navigate('/customer/dash')}>
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
