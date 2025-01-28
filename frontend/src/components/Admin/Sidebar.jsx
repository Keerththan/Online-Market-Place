import React, { Children, useEffect, useState } from 'react'
import {FaHome,FaShoppingCart,FaWindowClose} from 'react-icons/fa';
import { Dashboard } from './Dashboard';
import { BiLogOutCircle } from 'react-icons/bi';
import {BiSolidReport} from "react-icons/bi";
import { AiFillDashboard, AiFillShopping } from 'react-icons/ai';
import { IoPerson } from 'react-icons/io5';
import {Link, useNavigate} from 'react-router-dom'
import { Login } from '../Home/Login';


const AdminSidebar = ({sidebarToggle,setSidebarToggle,user}) => {

    const [scrolled, setScrolled] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const navigate=useNavigate();
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
       
        if (prevScrollPos < currentScrollPos) {
            setScrollDirection('up');
            setScrolled(false);
            setSidebarToggle(false);
        } else if (prevScrollPos > currentScrollPos) {
            setScrollDirection('down');
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };


  return (
<div className={`${scrolled ? "sticky-top" : ""} d-flex z-3`}>
    <Dashboard
    sidebarToggle={sidebarToggle}
    setSidebarToggle={setSidebarToggle}
    />
   
   <div className={`${sidebarToggle ? "fixed" : "d-none"} w-25 d-felx   bg-color h-full ${scrolled ? "justify-content-start position-absolute z-1000" : ""}`}>
        <div className='mx-2 d-flex fs-5 fw-bold h-12 text-white align-items-center justify-content-between'>
            <span>Admin Dashboard</span>
            <FaWindowClose className='fabar w-6 h-6'onClick={()=> setSidebarToggle(!sidebarToggle)}/>
        </div>
        <hr className='text-white m-0'></hr>
        <ul className='text-white list-unstyled fw-bold bg-color pt-3 h-100vh '> 
                <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center active'>
                    <Link to="/admin/dash" className='text-decoration-none text-white fs-5 px-2'>
                    <AiFillDashboard className='w-6 h-6 mx-3 pb-1'/>Dashboard
                    </Link>
                </li>
                {/*<li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <Link to="#" className='text-decoration-none text-white fs-5 px-2'>
                    <FaHome className='w-6 h-6 mx-3 pb-1'/>Home
                    </Link>
                </li>*/}
                <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <Link to="/admin/Companydetails" className='text-decoration-none text-white fs-5 px-2'>
                    <FaShoppingCart className='w-6 h-6 mx-3 pb-1'/>Company
                    </Link>
                </li>
                <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <Link to ="/admin/Customerdetails" className='text-decoration-none text-white fs-5 px-2'>
                    <IoPerson className='w-6 h-6 mx-3 pb-1'/>Customers
                    </Link>
                </li>
                <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <Link to ="/admin/Order" className='text-decoration-none text-white fs-5 px-2'>
                    <AiFillShopping className='w-6 h-6 mx-3 pb-1'/>Orders
                    </Link>
                </li>
                {/* <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center'>
                    <Link to ="#" className='text-decoration-none text-white fs-5 px-2'>
                    <BiSolidReport className='w-6 h-6 mx-3 pb-1'/>Reports
                    </Link>
                </li> */}
                <li className='mb-3 hover-bg-blue-500 py-1 rounded align-items-center' onClick={handleLogout}>
                    <Link to="#" className='text-decoration-none text-white fs-5 px-2' >
                    <BiLogOutCircle className='w-6 h-6 mx-3 pb-1'/>Logout
                    </Link>
                </li>
        </ul>
    </div>
    
</div>
  )
}
export default AdminSidebar;