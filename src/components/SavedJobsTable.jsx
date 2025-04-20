import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Shadcn UI Table components
import { Button } from '@/components/ui/button'; // Shadcn UI Button

const SavedJobsTable = ({ savedJobs }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Table>
        {/* Table Header */}
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Job Role</TableHead> {/* New Column */}
            <TableHead>Actions</TableHead> {/* Column for Remove Button */}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {savedJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.role || "N/A"}</TableCell> {/* New Column */}
              <TableCell>
                <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SavedJobsTable;