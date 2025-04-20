import { createSlice } from "@reduxjs/toolkit";

const initialState={
    jobs:[],
    adminJobs:[],
    singleJob:null,
    appliedJobs:[],
    searchedQuery:""
}

const jobSlice = createSlice({
    name:"job",
    initialState,
    reducers:{
        setAllJobs:(state, action)=>{
            state.jobs = action.payload
        },
        setSingleJob:(state, action)=>{
            state.singleJob = action.payload
        },
        setRecruiterJobs:(state, action)=>{
            state.adminJobs = action.payload
        },
        deleteJob:(state, action)=>{
            state.adminJobs = state.adminJobs.filter(job=>job._id !== action.payload)
        },
        setAppliedJobs:(state, action)=>{
            state.appliedJobs = action.payload
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery = action.payload
        }
    }
});
export const {setAllJobs,setSingleJob, setRecruiterJobs,deleteJob,setAppliedJobs,setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;