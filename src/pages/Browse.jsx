import JobCard from "@/components/JobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/slices/jobSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Browse = () => {
  useGetAllJobs();
  const { jobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);
  return (
    <div className="container mx-auto my-2 min-h-[100vh]">
      <div>
        <p className="text-2xl font-semibold">Search Result ({jobs?.length})</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5">
        {jobs.map((job) => (
          <JobCard job={job} key={job._id} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
