import { setRecruiterJobs } from "@/redux/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllRecruiterJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllAdminJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8400/api/job/adminJobs", {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch(setRecruiterJobs(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllRecruiterJobs;
