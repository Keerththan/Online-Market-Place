import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('user');
        navigate('/login');
    }, [navigate]);
    
    return null;
}



