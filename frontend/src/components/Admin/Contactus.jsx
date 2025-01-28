import React, { useRef } from 'react';
import 'typeface-poppins';
//import emailjs from '@emailjs/browser';
import emailjs from "emailjs-com";
import { Link } from 'react-router-dom';

const Contactus = () => {
  const form = useRef();
  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm('service_dqqsxu7', 'template_snuegg9', form.current, '5uN_bxYsTwkCwjBMT')
      .then(
        (result) => {
          console.log('SUCCESS!');
          alert('Mail send success...!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <>
      <div className="homeHeader">

        <div className="homeHeaderLinks" >
          <Link to="/" style={{ fontSize: '150%' }}>Home</Link>
          <Link to="/products" style={{ fontSize: '150%' }}>Products</Link>
          <Link to="/faqs" style={{ fontSize: '150%' }}>FAQs</Link>
          <Link to="/Login" style={{ fontSize: '150%' }}>Log in</Link>
        </div>
      </div>
      <div className="container justify-content-center rounded bg-white mt-5" style={{ width: '70%', fontFamily: 'Poppins' }} >

        <div className='card shadow mb-5' >
          <div className='card-body'>
            <h2 className='text-center text-primary'>Get in Touch</h2>
            <div className='row'>
              <div className='col-md-6 '>
                <img src="public/contact.jpg" alt='img' style={{ width: '90%' }} />
              </div>
              <form ref={form} onSubmit={sendEmail} className='col-md-6 border-left mt-4' style={{ fontSize: '16px' }}>

                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-control" name="user_name" placeholder=' Name' required />
                </div>
                {/* <div className="form-group mt-3">
                <label>Mobile Number</label>
                <input type="text" className="form-control"  placeholder='Mobile ' required />
              </div> */}
                <div className="form-group mt-3">
                  <label>Email Address</label>
                  <input type="text" className="form-control" name="user_email" placeholder='Email' required />
                </div>
                <div className="form-group mt-3">
                  <label>Message</label>
                  <textarea rows='4' className="form-control" name="message" placeholder=' Message......' required />
                </div>
                <div className='text-end mt-4'>
                  <input type="submit" className="btn btn-primary shadow w-100" value='Send Email' />
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Contactus 