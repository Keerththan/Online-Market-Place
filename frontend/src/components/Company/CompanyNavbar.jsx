import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { MdOutlineMessage } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const CompanyNavbar = ({ sidebarToggle, setSidebarToggle, user }) => {
  const navigate = useNavigate();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        if (user) {
          const response = await axios.post(
            "http://localhost:8080/backend/api/Company/Message/unread.php", 
            { companyOwnerID: user.companyOwnerID }
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

    const interval = setInterval(fetchUnreadMessages, 30000); // 30 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [user]);

  return (
    <nav className={`${sidebarToggle ? "ml-25" : ""} d-flex w-full justify-content-between px-4 align-itmes-center navbar text-white`}>
      <div className='d-flex align-items-center my-1 fs-5'>
        <div className='d-flex text-white me-1'>
          <FaBars className={`fabar ${sidebarToggle ? "d-none" : ""}`} onClick={() => setSidebarToggle(!sidebarToggle)} />
        </div>
        <div className='d-flex text-white align-items-center'>
          {user.companyName}
        </div>
      </div>
      <div className='d-flex align-items-center'>
        <Link to="/company/messageList" className='d-flex ms-2 align-items-center cursor-pointer'>
          <MdOutlineMessage style={{ height: '20px', width: '20px' }} />
          {unreadMessagesCount > 0 && (
            <div className="notification-badge">{unreadMessagesCount}</div> // Notification Badge
          )}
        </Link>
        <div className='d-flex ms-2 align-items-center cursor-pointer logout-btn' onClick={handleLogout}>
          <IoLogOut style={{ height: '20px', width: '20px' }} />
          <span className='px-1 d-none d-md-block d-flex'>Log Out</span>
        </div>
      </div>
    </nav>
  );
};
