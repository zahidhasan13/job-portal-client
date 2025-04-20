import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you're using Shadcn UI

const JobFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    location: '',
    jobType: [],
    experienceLevel: [],
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'location') {
      setFilters((prev) => ({ ...prev, [name]: value }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value] // Add to array if checked
          : prev[name].filter((item) => item !== value), // Remove from array if unchecked
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
          <div className="space-y-2">
            {['Full-time', 'Part-time', 'Contract', 'Remote'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  name="jobType"
                  value={type}
                  checked={filters.jobType.includes(type)}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
          <div className="space-y-2">
            {['Entry', 'Mid-level', 'Senior'].map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="checkbox"
                  name="experienceLevel"
                  value={level}
                  checked={filters.experienceLevel.includes(level)}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Apply Filters
        </Button>
      </form>
    </div>
  );
};

export default JobFilter;