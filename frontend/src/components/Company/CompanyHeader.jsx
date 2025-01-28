import React from 'react'
import logo from '../../../public/Elitez.png'
import { FaUser, FaInfoCircle, FaUserCircle } from "react-icons/fa";

const CompanyHeader=() =>{
  return (
    <div className='d-flex w-100 bg-headercolor justify-content-between align-items-center'>
      <div className='d-flex '>
        <div className=''>
          <img src={logo} alt="" className='h-14 w-14 d-felx my-2 ms-3' />
        </div>
        <div className='fs-1 fw-bold ms-2 my-2 '>EliteZ</div>
      </div>
      <div className='d-flex justify-content-between '>
        <div className='d-flex px-3'>
          <a href="/about_us" className='text-black text-decoration-none'> About
            <FaInfoCircle className=' mx-2' />
          </a>
        </div>
        <div className='d-flex px-3'>
          <a href="" className='text-black text-decoration-none'> Contact
            <FaUser className=' mx-2' />
          </a>
        </div>

      </div>
    </div>
  );
};
export default CompanyHeader;
