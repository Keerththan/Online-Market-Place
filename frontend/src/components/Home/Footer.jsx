import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Footer = ({toggle}) => {
  return (
    <footer className={`${toggle ? "ml-25" :""} bg-dark text-white  p-5 mt-5 height-150`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 m-3">
            <h5>About Us</h5>
            <p className='text-secondary' style={{fontSize:'130%'}}>We provide comprehensive inventory management and distribution <br></br>solutions to streamline your supply chain.</p>
            <div className="col-md-6 mb-3 mt-3">
              <a href="https://www.facebook.com" className="text-secondary ms-1">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://www.twitter.com" className="text-secondary ms-4">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://www.instagram.com" className="text-secondary ms-4">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://www.linkedin.com" className="text-secondary  ms-4">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
          <div className="col-md-4 m-3">
            <h5>Contact Us</h5>
            <p className='text-secondary' style={{fontSize:'130%'}}><FontAwesomeIcon icon={faEnvelope} />&nbsp; info@inventoryfulfillment.com</p>
            <p className='text-secondary' style={{fontSize:'130%'}}><FontAwesomeIcon icon={faPhone} />&nbsp;(123) 456-7890</p>
            <p className='text-secondary' style={{fontSize:'130%'}}><FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp; 123 Main St, Suite 500, Cityville, USA</p>
          </div>
          <div className="col-md-2 m-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled" style={{lineHeight:'2'}}>
              <li><a href="/" className="text-secondary text-decoration-none " style={{fontSize:'140%'}}>Home</a></li>
              <li><a href="/services" className="text-secondary text-decoration-none " style={{fontSize:'140%', marginBottom:'80%'}}>Services</a></li>
              <li><a href="/about" className="text-secondary text-decoration-none " style={{fontSize:'140%',marginBottom:'80%'}}>About Us</a></li>
              <li><a href="/contact" className="text-secondary text-decoration-none " style={{fontSize:'140%',marginBottom:'80%'}}>Contact</a></li>
              <li><a href="/faq" className="text-secondary text-decoration-none  mb-5" style={{fontSize:'140%',marginBottom:'40%'}}>FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-top border-secondary my-3"></div>
          <div className="text-center">
            <p className="mb-0" style={{fontSize:'130%'}}>&copy; 2024 Inventory Fulfillment and Distribution. All rights reserved.</p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
