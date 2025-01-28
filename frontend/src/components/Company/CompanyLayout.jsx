import React, { useEffect, useState } from 'react'
import CompanySidebar from './CompanySidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import withAuth from './withAuth';

const CompanyLayout = ({setToggle}) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [user, setUser] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storeduser = JSON.parse(sessionStorage.getItem('user'));
    if (storeduser) {
      const userType = storeduser.userType;
      console.log('before user values:', storeduser);
      if (userType === 'company') {
        if (user == null) {
          setUser(storeduser);
        }
        const getUserDetails = async () => {
          try {
            const email = storeduser.email;
            console.log('fetching email : ', email);
            const userType = 'companyowners';
            const response = await axios.post('http://localhost:8080/backend/api/Home/getUserDetails.php', { email, userType });
            setUser(response.data);
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
      <CompanySidebar sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        user={user} error={error}
        setToggle={setToggle}
      />
      <div className={`${sidebarToggle ? "ml-25 w-75" : " w-100"} `}>
        <Outlet context={{ user: user, sidebarToggle: sidebarToggle, setSidebarToggle: setSidebarToggle }} />
      </div>
    </div>
  )
}

// export default CompanyLayout;
export default withAuth(CompanyLayout);