import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bookmark } from 'lucide-react'; // Import the Bookmark icon
import moment from 'moment';

const JobCard = ({ job, isSaved, onSave }) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
              {job?.company?.logo ? (
                <img 
                  src={job?.company?.logo} 
                  alt={`${job?.company?.name} logo`} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-xl font-bold text-gray-400">
                  {job?.companyName?.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-lg text-gray-900 line-clamp-1">{job?.title}</h3>
              <p className="text-sm text-gray-500">{job?.company.name}</p>
            </div>
          </div>
          <Badge variant={job?.jobType === 'Full-time' ? 'default' : 'outline'} className="ml-2">
            {job?.employmentType}
          </Badge>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-500 gap-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job?.location}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {moment(job?.applicationDeadline).format("DD-MM-YYYY")}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {job?.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-800">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <p className="font-medium text-blue-600">${job?.salary.min} - {job?.salary.max}</p>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSave}
              className="flex items-center gap-1"
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'text-blue-600 fill-blue-600' : 'text-gray-400'}`} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
            <Link to={`/job-details/${job?._id}`}>
              <Button className="bg-black">View Details</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;