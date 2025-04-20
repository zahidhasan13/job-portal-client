import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllApplicants } from "@/redux/slices/applicationSlice";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { toast } from "sonner";

const Applicants = () => {
  const { id } = useParams();
  const { applicant } = useSelector((state) => state.application);
  const dispatch = useDispatch();
  //   console.log(applicant.applications,"applicants");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8400/api/application/${id}/applicant`,
          { withCredentials: true }
        );
        console.log(response.data.job.applications, "app");
        dispatch(setAllApplicants(response.data.job));
      } catch (error) {
        console.error("Failed to fetch applicants: ", error);
      }
    };
    fetchApplicants();
  }, [id, dispatch]);

  const status = ["accepted", "rejected"];

    const statusHandler = async (status, applicationId) => {
    try {
      const response = await axios.post(
        `http://localhost:8400/api/application/status/${applicationId}/update`,
        { status },
        { withCredentials: true }
      );
      console.log(response.data, "status");
      if(response.status===200){
        toast.success("Status Updated Successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    };
}

  // Check if applicants data exists and has the expected structure
  if (!applicant) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        No Application Found!
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        Applicants ({applicant.applications.length})
      </h2>
      {/* Applicants Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Application Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicant.applications.map((applicant) => (
            <TableRow key={applicant._id || applicant.id}>
              <TableCell className="font-medium">
                {applicant.applicant.name}
              </TableCell>
              <TableCell>{applicant.applicant.email}</TableCell>
              <TableCell>{applicant.applicant.phone}</TableCell>
              <TableCell>
                {applicant.applicant.profile.resume ? (
                  <a
                    href={applicant.applicant.profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    {applicant.applicant.profile.resumeOriginalName}
                  </a>
                ) : (
                  "No resume uploaded"
                )}
              </TableCell>
              <TableCell>
                {moment(applicant.applicant.createdAt).format('DD-mm-yyyy')}
              </TableCell>
              <TableCell>
                <Badge
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    applicant.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : applicant.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {applicant.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {
                        status.map((stat) => (

                          <DropdownMenuItem
                            key={stat}
                            className={{ "text-green-500": stat === "accepted" }}
                            onClick={() => statusHandler(stat, applicant._id)}
                          >
                            {stat === "accepted" ? (
                              <Check className="h-4 w-4 mr-2" />
                            ) : stat === "rejected" ? (
                              <X className="h-4 w-4 mr-2" />
                            ) : null}
                            {stat}
                          </DropdownMenuItem>
                        ))
                    }
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Applicants;
