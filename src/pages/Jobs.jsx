import AllJobs from '@/components/AllJobs';
import JobFilter from '@/components/JobFilter';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Jobs = () => {
  useGetAllJobs()
  const { jobs } = useSelector((state) => state.job);
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    experienceLevel: '',
  });


  // Filter jobs based on filters
  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location === '' || job.location.includes(filters.location)) &&
      (filters.jobType === '' || job.jobType === filters.jobType) &&
      (filters.experienceLevel === '' || job.experienceLevel === filters.experienceLevel)
    );
  });

  if (!jobs || jobs.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your search filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Job Filter */}
        <div className="lg:col-span-1">
          <JobFilter onFilter={setFilters} />
        </div>

        {/* All Jobs */}
        <div className="lg:col-span-3">
          <AllJobs filteredJobs={filteredJobs} jobs={jobs}/>
        </div>
      </div>
    </div>
  );
};

export default Jobs;