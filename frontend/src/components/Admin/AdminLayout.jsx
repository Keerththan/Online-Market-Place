import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './Sidebar';

const AdminLayout = ({setToggle}) => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [user , setUser] =useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionUser = JSON.parse(sessionStorage.getItem('user'));
        const storedUser =  sessionUser;
        if (storedUser) {
            console.log("user from session storage", storedUser.userType);
            if (storedUser.userType === 'admin') {
                setUser(storedUser);
            } else {
                
                navigate('/login');
            }
        }else{
            navigate('/');
        }
    }, [navigate]);

    useEffect(()=>{
        setToggle(sidebarToggle);  
    });

    if (!user) {
        return null; // or a loading spinner
    }

    return (
    <div className='d-flex flex-column min-height-100vh'>
            <AdminSidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} user={user}/>
            <div className={`${sidebarToggle?"ml-25":"w-full"}`}>
                <Outlet  context={{ sidebarToggle: sidebarToggle, setSidebarToggle: setSidebarToggle }} />
            </div>
        </div>
    )
};

export default AdminLayout;
