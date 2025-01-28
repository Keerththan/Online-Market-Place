import React, { useState } from 'react'
import { FaHome, FaCartPlus, FaShoppingCart, FaShoppingBag, FaCog, FaWindowClose, FaUser, FaList } from 'react-icons/fa';
import { Dashboard } from './Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export const CustomerSidebar = ({ sidebarToggle, setSidebarToggle ,user,error,searchQuery, setSearchQuery,setToggle}) => {
    // const [user , setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    // const [error , setError] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    
    const [search,setSearch]=useState(true);
    const navigate = useNavigate();

    // if (sidebarToggle) {
    //     window.scrollTo(0,0);
    // }

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        // Determine scroll direction
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
    useEffect(()=>{
        setToggle(sidebarToggle);
    })

    if(error){
        return <div> Error : {error.message} </div>;
    }
    return (
        <div className={`${scrolled ? "sticky-top" : " "} d-flex`}>
            <Dashboard
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
                search={search}
                setSearch={setSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                user={user}
            />
            <div className={`${sidebarToggle ? "xs-w-50 md-w-25 sm-w-25" : "d-none"} ${scrolled?"position-absolute ":""} z-3 fixed d-felx bg-color h-full`}>
                <div className='mx-2 d-flex fs-5 fw-bold h-12 text-white align-items-center justify-content-between'>
                    <span>{user ? user.customerName:'loading....'} Dashboard</span>
                    <FaWindowClose className='fabar w-6 h-6' onClick={() => setSidebarToggle(!sidebarToggle)} />
                </div>
                <hr className='text-white m-0'></hr>
                
                <ul className='h-100vh pt-2 bg-color text-white list-unstyled fw-bold  '>
                    <li className='mb-2  hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to={"/customer/dash"} className='text-decoration-none text-white fs-5 px-2' onClick={(e)=>setSearch(true)}>
                            <FaHome className='w-6 h-6 mx-3 pb-1' />Dashboard
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to={"/customer/CartItems"} className='text-decoration-none text-white fs-5 px-2' onClick={(e)=>setSearch(false)}>
                            <FaShoppingCart className='w-6 h-6 mx-3 pb-1' />Card
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to="/customer/shop" className='text-decoration-none text-white fs-5 px-2' onClick={(e)=>setSearch(true)}>
                            <FaShoppingBag className='w-6 h-6 mx-3 pb-1' />Shop
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to="/customer/orders" className='text-decoration-none text-white fs-5 px-2' onClick={(e)=>setSearch(true)}>
                        <FaList className='w-6 h-6 mx-3 pb-1' />View Orders
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to="/customer/setting" className='text-decoration-none text-white fs-5 px-2' onClick={(e)=>setSearch(false)}>
                            <FaCog className='w-6 h-6 mx-3 pb-1' />Setting
                        </Link>
                    </li>
                    <li className='mb-2 hover-bg-blue-500 py-1 rounded align-items-center'>
                        <Link to="" className='text-decoration-none text-white fs-5 px-2' onClick={handleLogout}>
                            <FaUser className='w-6 h-6 mx-3 pb-1' />Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
