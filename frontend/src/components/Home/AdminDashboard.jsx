import { useEffect, useState } from 'react'
import React from 'react'
import '../css/AdminDashboard.css'
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log("User from session storage: ",user);
    if(!user){
      navigate('/login');
    }else{
      setUser(user);
    }
  },[navigate]);

  const [sideBarIsOpen, setSideBarIsOpen] = useState(true);
  const toggleSidebar = (event) => {
    event.preventDefault();
    setSideBarIsOpen(!sideBarIsOpen);
  }
  return (
    user && (
      <div id="adminDashboardMainContainer">
        <div id="adminDashboard_slidebar" style={{width: sideBarIsOpen ? '20%' : '8%', transition: '0.3s all'}}>
          <h3 id="adminDashboard_logo" style={{fontSize: sideBarIsOpen ? '35px' : '20px'}}>EliteZ</h3>
          <div id="adminDashboard_slidebar_user">
                <img src="../adminImages/admin2.jpg" alt="User Image" id="userImage" style={{width: sideBarIsOpen ? '90px' : '80px'}}/>
                <span id="userName" style={{fontSize:sideBarIsOpen ? '20px' : '15px'}}>{admins.adminName}</span>
            </div>
            <div className="adminDashboard_slidebar_menus">
              <div className="adminDashboard_menu_lists" style={{textAlign: sideBarIsOpen ? 'left' : 'center'}}>
                <li>
                  <a href="javascript:void(0);"><i class="fa-solid fa-gauge"></i><span class="menuText" style={{display: sideBarIsOpen ? 'inline-block' : 'none'}}> Dashboard</span></a>
                </li>
                <li>
                  <a href=""><i class="fa-solid fa-gauge"></i><span class="menuText" style={{display: sideBarIsOpen ? 'inline-block' : 'none'}}> Dashboard</span></a>
                </li>
              </div>
            </div>
        </div>
        <div id="adminDashboard_content_container" style={{width: sideBarIsOpen ? '80%' : '92%'}}>
          <div className="adminDashboard_topNav">
            <a href="" id="toggleBtn" onClick={toggleSidebar}><i class="fa-solid fa-bars"></i></a>
            <a href="logout.php" id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i> Log Out </a>
          </div>
          <div className="adminDashboard_content">
            <div className="adminDashboard_content_main">
                <h1>Welcome to Admin Dashboard, {user.adminName}</h1>
            </div>
          </div>
      </div>
    </div>

    )
  )
}

