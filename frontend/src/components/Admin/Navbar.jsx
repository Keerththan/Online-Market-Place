import React from 'react'
import {FaBars,FaUserCircle, FaSearch, FaBell} from 'react-icons/fa'
export const Navbar = ({sidebarToggle,setSidebarToggle}) => {
  return (
    <nav className='d-flex w-full justify-content-between px-4 align-itmes-center navbar text-white'>
    <div className='d-flex align-items-center my-1 fs-5'>
        <div className='d-flex text-white me-1'><FaBars className={`fabar ${sidebarToggle?"d-none":""}`} onClick={()=>setSidebarToggle(!sidebarToggle)}/></div>
        <div className='d-flex text-white'>Admin</div>
    </div>
    {/* <div className='d-flex align-items-center'>
        <div className='d-flex ms-2 align-items-center cursor-pointer'><FaUserCircle style={{height:'20px',width:'20px'}}/><span className='px-1 d-none d-md-block d-flex' style={{fontSize:'130%'}} >Profile</span></div>
    </div> */}
  </nav>
  )
}

