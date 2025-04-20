import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming you're using Shadcn UI
import JobCard from './JobCard';

const AllJobs = ({jobs}) => {
   
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Get current jobs for the page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {currentJobs.map((job) => (
          <JobCard key={job._id} job={job}/>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;