import HeroSection from '@/components/HeroSection';
import JobCategorySection from '@/components/JobCategorySection';
import LatestJobs from '@/components/LatestJobs';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const {user} = useSelector(state=>state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user && !user.role === 'jobseeker'){
            navigate('/recruiter/companies');
        }
    },[navigate, user]);
    return (
        <>
            <HeroSection/>
            <JobCategorySection/>
            <LatestJobs/>
        </>
    );
};

export default Home;