import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (!user || user.userType !== 'company') {
        navigate('/'); // Redirect to homepage if user is not authenticated or not a company user
      }
    }, [navigate]);

    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || user.userType !== 'company') {
      return null; // Prevent rendering if user is not authenticated
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
