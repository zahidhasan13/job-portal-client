import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (user && user.role !== 'recruiter') {
            navigate('/');
        }
    }, [user, navigate]);

    

    return children;
};

export default AdminRoute;