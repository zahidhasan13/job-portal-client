import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  BarChart,
  Mail,
  ArrowLeft,
  Edit,
} from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/slices/jobSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "sonner";

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  console.log(singleJob,"skills");

  // Check if the user has already applied for the job
  const [isApplied, setIsApplied] = useState(
    singleJob?.applications?.some((app) => app.applicant === user?.id) || false
  );
  // Update isApplied whenever singleJob changes
  useEffect(() => {
    setIsApplied(
      singleJob?.applications?.some((app) => app.applicant === user?.id) ||
        false
    );
  }, [singleJob, user?.id]);

  // Function to handle job application
  const appliedJob = async () => {
    try {
      const res = await axios.get(
        // Changed to POST as applying is typically a POST request
        `http://localhost:8400/api/application/apply/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        toast.success("Successfully applied for the job.");

        // Update the singleJob state with the new application
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user.id }],
        };
        dispatch(setSingleJob(updatedJob));

        // Update isApplied state
        setIsApplied(true);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error(
        error.response?.data?.error || "Failed to apply for the job."
      );
    }
  };

  // Fetch the single job data when the component mounts or the job ID changes
  useEffect(() => {
    const getSingleJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:8400/api/job/${id}`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          dispatch(setSingleJob(res.data));
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to fetch job details. Please try again.");
      }
    };

    getSingleJobs();
  }, [dispatch, id]);

  // Format salary range
  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return "Negotiable";

    const formatNumber = (num) => {
      return num >= 1000 ? `${(num / 1000).toFixed(0)}k` : num;
    };

    if (salary.min && salary.max) {
      return `${salary.currency} ${formatNumber(salary.min)} - ${formatNumber(
        salary.max
      )}`;
    } else if (salary.min) {
      return `${salary.currency} ${formatNumber(salary.min)}+`;
    } else if (salary.max) {
      return `Up to ${salary.currency} ${formatNumber(salary.max)}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md min-h-screen">
      {/* Back Button */}
      <div className="p-4 border-b">
        <button
          onClick={()=>navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </button>
      </div>

      <div className="p-8">
        {/* Job Title and Company with Logo */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center">
            <div className="relative mr-4 flex-shrink-0">
              {singleJob?.company?.logo ? (
                <img
                  src={singleJob.company.logo}
                  alt={`${singleJob.company.name} logo`}
                  className="w-16 h-16 rounded-md object-contain border border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
                  <span className="text-xl font-bold text-gray-500">
                    {singleJob?.company?.name?.charAt(0) || "C"}
                  </span>
                </div>
              )}

              {/* Show verification badge if company is verified */}
              {singleJob?.company?.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {singleJob?.title}
              </h1>
              <p className="text-gray-600">
                {singleJob?.company?.name || "Company Name"}
              </p>
            </div>
          </div>

          {user?.role === "recruiter" ? (
            <div className="flex flex-col gap-2">
              <Link to="/recruiter/job/update">
              <Button
                className="bg-black hover:bg-gray-800"
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Update Job</span>
              </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                onClick={isApplied ? null : appliedJob}
                disabled={isApplied}
                className="bg-black hover:bg-gray-800"
              >
                {isApplied ? "Applied" : "Apply Now"}
              </Button>
              <Button variant="outline" className="border-gray-300">
                Save Job
              </Button>
            </div>
          )}
        </div>

        {/* Job Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm text-gray-500 mb-1">Employment Type</h3>
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-gray-700" />
              <span className="font-medium">
                {singleJob?.employmentType || "Not specified"}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm text-gray-500 mb-1">Salary Range</h3>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-gray-700" />
              <span className="font-medium">
                {formatSalary(singleJob?.salary)}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm text-gray-500 mb-1">Location</h3>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-700" />
              <span className="font-medium">
                {singleJob?.location || "Remote"}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 text-sm text-gray-600">
          <div className="flex items-center">
            <BarChart className="w-4 h-4 mr-2" />
            <span>{singleJob?.experienceLevel || "Not specified"}</span>
          </div>

          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>
              Posted {moment(singleJob?.createdAt, "YYYYMMDD").fromNow()}
            </span>
          </div>

          {singleJob?.applicationDeadline && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>
                Apply by{" "}
                {new Date(singleJob?.applicationDeadline).toLocaleDateString()}
              </span>
            </div>
          )}

          <div className="flex items-center">
            <span className="mr-2">
              {singleJob?.applications?.length || 0} applications
            </span>
            <span>•</span>
            <span className="ml-2">{singleJob?.views || 0} views</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <div className="text-gray-700 whitespace-pre-line">
            {singleJob?.description}
          </div>
        </div>

        {/* Requirements */}
        {singleJob?.requirements && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <div className="text-gray-700 whitespace-pre-line">
              {singleJob?.requirements}
            </div>
          </div>
        )}

        {/* Responsibilities */}
        {singleJob?.responsibilities &&
          singleJob?.responsibilities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
              <ul className="list-disc list-outside ml-5 text-gray-700 space-y-2">
                {singleJob?.responsibilities?.split(",")?.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          )}

        {/* Skills */}
        {singleJob?.skills && singleJob.skills?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {singleJob?.skills?.split(',').map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 py-1 px-3"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Industry */}
        {singleJob?.industry && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Industry</h2>
            <p className="text-gray-700">{singleJob?.industry}</p>
          </div>
        )}

        {/* Contact Email */}
        {singleJob?.contactEmail && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="flex items-center text-gray-700">
              <Mail className="w-5 h-5 mr-2" />
              <a
                href={`mailto:${singleJob?.contactEmail}`}
                className="text-blue-600 hover:underline"
              >
                {singleJob.contactEmail}
              </a>
            </div>
          </div>
        )}

        {/* Apply Button */}
        {
          user === 'jobseeker' && <div className="mt-8 text-center">
          <Button
            onClick={isApplied ? null : appliedJob}
            disabled={isApplied}
            className="bg-black hover:bg-gray-800 px-8 py-6 text-lg"
          >
            {isApplied ? "Applied" : "Apply for this position"}
          </Button>
        </div>
        }

        {/* Company About */}
        {singleJob?.company?.description && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-semibold mb-4">
              About {singleJob.company.name}
            </h2>
            <p className="text-gray-700">{singleJob.company.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
