import React, { useEffect, useState } from "react";
import { Plus, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import useGetAllRecruiterJobs from "@/hooks/useGetAllRecruiterJobs";
import moment from "moment";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "sonner";
import { deleteJob } from "@/redux/slices/jobSlice";

const RecruiterJobs = () => {
  useGetAllRecruiterJobs();
  const { adminJobs: jobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  // State for filtering
  const [selectedCompany, setSelectedCompany] = useState("all-companies");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Update filtered jobs when selected company changes
  useEffect(() => {
    if (selectedCompany === "all-companies") {
      setFilteredJobs(jobs); // Show all jobs if no filter is selected
    } else {
      const filtered = jobs.filter(
        (job) => job.company.name === selectedCompany
      );
      setFilteredJobs(filtered); // Filter jobs by selected company
    }
  }, [selectedCompany, jobs]);

  // Get unique company names for the filter dropdown
  const uniqueCompanies = [...new Set(jobs?.map((job) => job?.company?.name))];

  // Clear filters
  const clearFilters = () => {
    setSelectedCompany("all-companies");
  };

  const deleteHandler = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this company!',
      icon: 'warning',
      iconColor: '#E91923',
      showCancelButton: true,
      confirmButtonColor: '#E91923',
      cancelButtonColor: '#000',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });
  
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:8400/api/job/delete/${id}`, { withCredentials: true });
        if (res.status === 200) {
          toast.success(res.data.message);
          dispatch(deleteJob(id));
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <Link to="/recruiter/job/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Button>
        </Link>
      </div>

      {/* Filters Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-64">
          <Label htmlFor="companyFilter" className="mb-2 block">
            Filter by Company
          </Label>
          <Select
            value={selectedCompany}
            onValueChange={(value) => setSelectedCompany(value)}
          >
            <SelectTrigger id="companyFilter" className="w-full">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-companies">All Companies</SelectItem>
              {uniqueCompanies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          onClick={clearFilters}
          className="mt-auto h-10"
        >
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      {/* Job Listings Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs?.length > 0 ? (
              filteredJobs?.map((job) => (
                <TableRow key={job?._id}>
                  <TableCell className="font-medium">{job?.title}</TableCell>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>
                    {moment(job?.createdAt).format("Do MMM YY")}
                  </TableCell>
                  <TableCell>{job?.applications?.length}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link to={`/job-details/${job._id}`}>
                            View job
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/recruiter/job/update">
                            Edit job
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to={`/recruiter/job/${job._id}/applicants`}>
                            Applicants
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Button onClick={()=>deleteHandler(job._id)} variant="destructive">Delete</Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No jobs found matching the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecruiterJobs;
