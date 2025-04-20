import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const LatestJobs = () => {
  useGetAllJobs();
  const { jobs } = useSelector((state) => state.job);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto">
        <div>
          <h2 className="text-3xl font-semibold uppercase">Latest Jobs</h2>
        </div>
        <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
          {jobs.slice(0, 6).map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
