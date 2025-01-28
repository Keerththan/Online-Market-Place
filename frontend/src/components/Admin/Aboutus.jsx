import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Aboutus.css'; // Make sure you import the updated CSS

function Aboutus() {
    return (
        <>
            {/* Navigation */}
            <div className="homeHeader">
                <div className="homeHeaderLinks">
                    <Link to="/" style={{ fontSize: '150%' }}>Home</Link>
                    <Link to="/products" style={{ fontSize: '150%' }}>Products</Link>
                    <Link to="/faqs" style={{ fontSize: '150%' }}>FAQs</Link>
                    <Link to="/Login" style={{ fontSize: '150%' }}>Log in</Link>
                </div>
            </div>

            {/* About Us Section */}
            <div className="about-section container-fluid p-5" style={{ fontFamily: 'Poppins', position: 'relative' }}>
                {/* Background overlay */}
                <div className="about-background-overlay"></div>

                <div className="row align-items-center">
                    {/* Text Section */}
                    <div className="col-xl-7 col-lg-7 mt-0">
                        <div className="about-info p-4 shadow-lg bg-white rounded">
                            <div className="section-title mb-4">
                                <h4 className="text-primary" style={{ fontSize: '28px' }}>About Us</h4>
                                <h1 className="mt-2 text-dark" style={{ fontSize: '48px' }}>EliteZ</h1>
                            </div>
                            <p className="text-secondary mt-1" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                                Our mission is to modernize inventory and distribution, making it more efficient, affordable, and accessible for businesses.
                                By using technology, we simplify supply chain management, allowing companies to focus on delivering quality products to
                                their customers. <br /> EliteZ connects businesses with customers directly, eliminating the need for store visits.
                                Our platform allows online order management, real-time inventory tracking, and efficient delivery planning, reducing costs
                                and boosting satisfaction.
                            </p>
                            <p className="text-secondary" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                                Designed for businesses of all sizes, EliteZ offers scalable tools to manage inventory, process orders, and grow your market reach.
                            </p>
                            <Link to="/" className="btn btn-outline-primary mt-3" style={{ fontSize: '15px' }}>
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="col-lg-5 col-md-4">
                        <div className="about-image mt-3 text-center">
                            <img src="public/login1.jpg" alt="About Us" className="img-custom" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Aboutus;
