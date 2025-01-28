import React, { useEffect, useState } from 'react';
import {FaBars,FaUserCircle, FaSearch, FaBell} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { MdOutlineMessage } from "react-icons/md";
import axios from 'axios';

export const Navbar = ({user,sidebarToggle,setSidebarToggle,search,setSearch,searchQuery, setSearchQuery}) => {


  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        if (user) {
          const response = await axios.post(
            "http://localhost:8080/backend/api/Customer/Message/message_unread.php", 
            { customerID: user.customerID }
          
          );
          if (response.data.unreadCount !== undefined) {
            setUnreadMessagesCount(response.data.unreadCount);
          }
        }
      } catch (error) {
        console.error('Error fetching unread messages:', error);
      }
    };

    fetchUnreadMessages();

    const interval = setInterval(fetchUnreadMessages, 30000); 
    return () => clearInterval(interval);
  }, [user]);

  return (
    <nav className='d-flex w-full justify-content-between px-4 align-itmes-center navbar text-white'>
    <div className='d-flex align-items-center my-1 fs-5'>
        <div className='d-flex text-white me-1'><FaBars className={`fabar ${sidebarToggle?"d-none":""}`} onClick={()=>setSidebarToggle(!sidebarToggle)}/></div>
        <div className='d-flex text-white'>{user.customerShopName}</div>
    </div>

    <div className='d-flex align-items-center'>
    <Link to="/customer/message-list" className='d-flex ms-2 align-items-center cursor-pointer'>
          <MdOutlineMessage style={{ height: '20px', width: '20px' }} />
          {unreadMessagesCount > 0 && (
            <div className="notification-badge">{unreadMessagesCount}</div> // Notification Badge
          )}
        </Link>
        {/* <div className={`${search?"":"d-none"} position-relative align-items-center  `}>
          <span className='ms-0 sm-relative md-absolute  align-items-center bg-success rounded '>
            <button className='btn btn-none d-flex align-items-center  h-6' ><FaSearch className='text-white '/></button></span>
          <input type='text' className='rounded focus-outline-none w-full h-6 ps-5 px-4 d-none d-md-block'
          value={searchQuery}
          onChange={handleSearch}/>
        </div> */}
        <Link to='/customer/profile' className='text-decoration-none text-white'><div className='  d-flex ms-2 align-items-center cursor-pointer'><FaUserCircle style={{height:'20px',width:'20px'}}/><span className='px-1 d-none d-md-block d-flex' onClick={(e)=>setSearch(false)}>Profile</span></div></Link>
    </div>
  </nav>
  )
}

{/* <div className='relative'>
    <button className='text-white group'>
        <FaUserCircle className='w-6 h-6 mt-1'/>
        <div className='z-10 hidden absolute rounded shadow w-32 group-focus:block top-full right-0 bg-white'>
          <ul className='py-2 text-gray-800 text-sm'>
            <li><a href="">Profile</a></li>
            <li><a href="">Profile</a></li>
            <li><a href="">Profile</a></li>
          </ul>
        </div>
    </button>
  </div> */}