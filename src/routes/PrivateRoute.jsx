import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } 
    }, [user, navigate]);

    if (user && (user.role === 'jobseeker' || user.role === 'recruiter')) {
        return children;
    }

    return null;
};

export default PrivateRoute;