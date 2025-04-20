import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming you're using Shadcn UI

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      {/* 404 Heading */}
      <h1 className="text-9xl font-bold text-gray-900">404</h1>

      {/* Message */}
      <p className="mt-4 text-2xl font-medium text-gray-700">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <Link to="/" className="mt-8">
        <Button className="bg-black">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;