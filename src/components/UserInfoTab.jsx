import React from "react";
import { Button } from "@/components/ui/button"; // Shadcn UI Button
import { User, Edit, Code } from "lucide-react"; // Icons
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

const UserInfoTab = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Profile Photo and Basic Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Profile Photo */}
          {user?.profile?.profilePhoto ? (
            <img
              src={user.profile.profilePhoto}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}

          {/* Name, Email, and Phone */}
          <div>
            <h2 className="text-2xl font-semibold">{user?.name || "Empty"}</h2>
            <p className="text-gray-600">{user?.email || "Empty"}</p>
            <p className="text-gray-600">{user?.phone || "Empty"}</p>
          </div>
        </div>

        {/* Update Profile Button */}
        <Link to="/profile/update">
        <Button
          variant="outline"
          className="flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Update Profile
        </Button>
        </Link>
      </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
       {/* Bio */}
       {user?.profile?.bio && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Bio</h3>
          <p className="text-gray-700">{user.profile.bio}</p>
        </div>
      )}

      {/* Description */}
      {user?.profile?.description && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{user.profile.description}</p>
        </div>
      )}

      

      {/* Skills */}
      {user?.profile?.skills && user.profile.skills.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.profile.skills.map((skill, index) => (
              <Badge key={index} className="flex items-center gap-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Address */}
      {user?.profile?.address && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Address</h3>
          <p className="text-gray-700">{user.profile.address}</p>
        </div>
      )}

      {/* Resume */}
      {user?.profile?.resume && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Resume</h3>
          <p className="text-gray-600 mb-2">
            <strong>File Name:</strong>{" "}
            {user.profile.resumeOriginalName || "Empty"}
          </p>
          <Button variant="link">
            <a href={user.profile.resume} target="_blank">
              View Resume
            </a>
          </Button>
        </div>
      )}

      {/* Company (for Recruiters) */}
      {user?.role === "recruiter" && user?.profile?.company && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <p className="text-gray-700">{user.profile.company.name}</p>
        </div>
      )}
     </div>
    </div>
  );
};

export default UserInfoTab;
