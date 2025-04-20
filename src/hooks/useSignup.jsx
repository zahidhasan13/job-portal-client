import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const useSignup = () => {
    const [isError, setIsError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const signup = async (name,email,password,phone,role) => {
        const data = { name,email,password,phone,role };
        setIsError('');
        setIsLoading(true);

        try {
            const res = await axios.post("http://localhost:8400/api/user/signup", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(res.status === 200){
                setIsLoading(false);
                toast.success("User Signup Successfullly!");
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError(error.response?.data?.error || 'An error occurred during signup');
        }
    };

    return { signup, isError, isLoading }; 
};

export default useSignup;