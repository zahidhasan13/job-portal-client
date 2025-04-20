import { setAppliedJobs } from "@/redux/slices/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8400/api/application", {
          withCredentials: true,
        });
        console.log(res.data.application);
        if (res.status === 200) {
          dispatch(setAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAppliedJobs();
  }, [dispatch]);
};

export default useAppliedJobs;
