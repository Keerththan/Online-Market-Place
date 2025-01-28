import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../../../public/Elitez.png'
import { FaUser, FaInfoCircle, FaUserCircle } from "react-icons/fa";
export default function Header() {

  const navigate = useNavigate();
  const handleLogo=()=>{
    navigate('/');
  };
  return (
    <div className='d-flex w-full bg-light justify-content-between align-items-center shadow'>
      <div className='d-flex cursor-pointer' onClick={handleLogo}>
        <div className='align-items-center d-flex'>
          <img src={logo} alt="" className='h-10 w-10 d-felx ms-3' />
        </div>
        <div className='fs-1 fw-bold ms-2 my-2 '>EliteZ</div>
      </div>
      <div className='d-flex justify-content-between '>
        <div className='d-flex px-3'>
          <Link to ="/Aboutus" className='text-black text-decoration-none'style={{fontSize:'160%'}}> About
            <FaInfoCircle className=' mx-2' />
          </Link>
        </div>
        <div className='d-flex px-3'>
          <Link to ="/Contactus" className='text-black text-decoration-none'style={{fontSize:'160%'}}> Contact
            <FaUser className=' mx-2' />
          </Link>
        </div>

      </div>

    </div>
  )
}
