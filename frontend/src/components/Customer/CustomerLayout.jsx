import React, { useEffect, useState } from 'react'
import { CustomerSidebar } from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import './customer.css';
import axios from 'axios';

const CustomerLayout = ({setToggle}) => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storeduser = JSON.parse(sessionStorage.getItem('user'));
        if (storeduser) {
            const userType = storeduser.userType;
            console.log('before user values:', storeduser);
            if (userType === 'customer') {
                if (user === null) {
                    setUser(storeduser);
                }
                const getUserDetails = async () => {
                    try {
                        const email = storeduser.email;
                        console.log('fetching email : ', email);
                        const userType = 'customers';
                        const response = await axios.post('http://localhost:8080/backend/api/Home/getUserDetails.php', { email, userType });
                        setUser(response.data);
                        sessionStorage.setItem('userID', JSON.stringify(response.data.customerID));
                        console.log('data success:', response.data);
                    } catch (error) {
                        console.error('Error fetching user details : ', error);
                    }
                };
                getUserDetails();
            } else {
                navigate('/login');
            }
        } else {
            navigate('/');
        }
    }, [navigate]);

 
    
    if (!user) {
        return null; // or a loading spinner
    }
    return (
        <div className='d-flex flex-column min-height-100vh'>
            <CustomerSidebar
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
                user={user} error={error}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setToggle = {setToggle}
            />
            <div className={`${sidebarToggle ? "ml-25" : "w-full"}`}>
                <Outlet
                    context={{ user: user, sidebarToggle: sidebarToggle, setSidebarToggle: setSidebarToggle,searchQuery :searchQuery  }}
                />
            </div>

        </div>
    )
}

export default CustomerLayout