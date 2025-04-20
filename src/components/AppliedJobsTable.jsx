import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Shadcn UI Table components
import { Badge } from "@/components/ui/badge"; // Shadcn UI Badge
import useAppliedJobs from "@/hooks/useAppliedJobs";
import { useSelector } from "react-redux";
import moment from "moment";

const AppliedJobsTable = () => {
  useAppliedJobs();
  const { appliedJobs } = useSelector((state) => state.job);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Table>
        {/* Table Header */}
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Applied Date</TableHead> {/* New Column */}
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        {/* Table Body */}
        <TableBody>
          {appliedJobs?.map((applied) => (
            <TableRow key={applied?.job?._id}>
              <TableCell className="font-medium">
                {applied?.job?.title}
              </TableCell>
              <TableCell>{applied?.job?.company?.name}</TableCell>
              <TableCell>{applied?.job?.location || "Headquaters"}</TableCell>
              <TableCell>{moment(applied?.createdAt).format("DD-MM-YYYY")}</TableCell>{" "}
              {/* New Column */}
              <TableCell>
                <Badge
                  variant={
                    applied?.status === "accepted"
                      ? "success"
                      : applied?.status === "rejected"
                      ? "destructive"
                      : "default"
                  }
                >
                  {applied?.status || "Pending"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
