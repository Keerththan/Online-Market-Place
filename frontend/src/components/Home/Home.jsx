import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State for loading
    const [validEmail, setValidEmail] = useState(true); // State for email validation

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset message and error states before the submission
        setMessage('');
        setError('');
        setValidEmail(true); // Reset email validation

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setValidEmail(false);
            return;
        }

        setLoading(true); // Start loading

        // Send email to PHP backend using Axios
        axios.post('http://localhost:8080/backend/api/Home/save_email.php', { email })
            .then(response => {
                const data = response.data;
                console.log('Server response:', data); // Log the response for debugging

                if (data.status === 'success') {
                    setMessage('Thank you! You have been subscribed.');
                    setEmail(''); // Clear email input after success
                } else if (data.message) {
                    // Display any error messages returned from the server
                    setError('Error: ' + data.message);
                } else {
                    // Handle case where response does not contain a message
                    setError('Error: Something went wrong. Please try again.');
                }
            })
            .catch(() => {
                // Handle any errors during the request
                setError('Error: Could not connect to the server.');
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    return (
        <div className=''>
            <div className="homeHeader">
                <div className="homeHeaderLinks">
                    <Link to="/" style={{ fontSize: '150%' }}>Home</Link>
                    <Link to="/products" style={{ fontSize: '150%' }}>Products</Link>
                    <Link to="/faqs" style={{ fontSize: '150%' }}>FAQs</Link>
                    <Link to="/Login" style={{ fontSize: '150%' }}>Log in</Link>
                </div>
            </div>
            <div className="homeBanner background-opacity">
                <div className="homePageContainer">
                    <div className="homeBannerHeader mt-150">
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
                    <p className="homeBannerTagline">Track your goods throughout your entire supply chain, from purchasing to production to end sales.</p>
                    <div className="homeBannerIcons">
                        <a href="https://www.apple.com"><i className="fa-brands fa-apple"></i></a>
                        <a href="https://www.android.com"><i className="fa-brands fa-android"></i></a>
                        <a href="https://www.microsoft.com"><i className="fa-brands fa-windows"></i></a>
                    </div>
                </div>
            </div>

            {/* Feature section */}
            <div className="homePageFeatures">
                <div className="homePageFeature">
                    <span className="homePageFeatureIcon"><i className="fa-solid fa-gear"></i></span>
                    <h3>Editable Theme</h3>
                    <p>An editable theme provides users with the flexibility to customize the visual appearance of their application. This feature allows users to modify colors, fonts, and layout settings according to their preferences.</p>
                </div>
                <div className="homePageFeature">
                    <span className="homePageFeatureIcon"><i className="fa-solid fa-star"></i></span>
                    <h3>Flat Design</h3>
                    <p>Flat design is a minimalist design approach that emphasizes usability and simplicity. It features clean, open spaces, crisp edges, bright colors, and two-dimensional illustrations.</p>
                </div>
                <div className="homePageFeature">
                    <span className="homePageFeatureIcon"><i className="fa-solid fa-globe"></i></span>
                    <h3>Reach Your Audience</h3>
                    <p>Reaching your audience involves leveraging various digital channels and strategies to connect with potential customers effectively.</p>
                </div>
            </div>

            {/* New Cards Section */}
        <div className="homePageCards">
            <h2>Our Features</h2>
            <div className="homePageCardContainer">
                <div className="homePageCard">
                    <i className="fa-solid fa-rocket homePageCardIcon"></i>
                    <h3>Fast Delivery</h3>
                    <p>Experience speedy delivery services that ensure your products reach customers in record time.</p>
                </div>
                <div className="homePageCard">
                    <i className="fa-solid fa-lock homePageCardIcon"></i>
                    <h3>Secure Transactions</h3>
                    <p>Your security is our priority. Enjoy safe and secure payment methods with advanced encryption.</p>
                </div>
                <div className="homePageCard">
                    <i className="fa-solid fa-headset homePageCardIcon"></i>
                    <h3>24/7 Support</h3>
                    <p>Our dedicated support team is available 24/7 to assist you with any inquiries or issues.</p>
                </div>
                <div className="homePageCard">
                    <i className="fa-solid fa-chart-line homePageCardIcon"></i>
                    <h3>Analytics Dashboard</h3>
                    <p>Gain insights into your business performance with our comprehensive analytics dashboard.</p>
                </div>
                </div>
            </div>

            {/* Email Notification Form */}
            <div className="homePageNotified">
                <div className="emailForm">
                    <h1>Get Notified of Any Updates!</h1>
                    <p>Stay informed about the latest updates and enhancements to EliteZ. Subscribe with your email to receive timely notifications.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="notifyFormContainer">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={loading}>Notify</button>
                            {loading && <div className="loader"></div>} {/* Loading Spinner */}
                        </div>
                    </form>
                    {/* Display success or error messages */}
                    {message && <p className="success-message">{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {!validEmail && <p style={{ color: 'red' }}>Please enter a valid email address.</p>} {/* Email validation error */}
                </div>
            </div>

            {/* Social Media Section */}
            <div className="homePageSocials">
                <h3>Say Hi & Get in Touch</h3>
                <p>Connect with us on social media and stay engaged with the EliteZ community. Follow us for updates, share your feedback, and join the conversation. We value your input and look forward to hearing from you!</p>
                <div className="homePageSocialsIconsContainer">
                    <a href="https://twitter.com/yourhandle"><i className="fa-brands fa-twitter"></i></a>
                    <a href="https://www.facebook.com/yourpage"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://www.pinterest.com/yourprofile"><i className="fa-brands fa-pinterest"></i></a>
                    <a href="https://plus.google.com/yourprofile"><i className="fa-brands fa-google-plus"></i></a>
                    <a href="https://www.linkedin.com/in/yourprofile"><i className="fa-brands fa-linkedin"></i></a>
                    <a href="https://www.youtube.com/channel/yourchannel"><i className="fa-brands fa-youtube"></i></a>
                </div>
            </div>
        </div>
    );
};
