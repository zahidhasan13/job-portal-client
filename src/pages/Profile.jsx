import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Briefcase, Bookmark } from "lucide-react";
import UserInfoTab from "@/components/UserInfoTab";
import AppliedJobsTable from "@/components/AppliedJobsTable";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton"; 

const Profile = () => {
  const [activeTab, setActiveTab] = useState("user-info");
  const { user, loading } = useSelector((state) => state.auth);

  // Loading state
  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <Skeleton className="h-10 w-full max-w-2xl mb-6" />
        <Skeleton className="h-[500px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <Tabs 
        defaultValue="user-info" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        {user?.role === "jobseeker" && (
          <TabsList className="grid w-full max-w-2xl grid-cols-2 mx-auto">
            <TabsTrigger value="user-info">
              <User className="w-4 h-4 mr-2" />
              User Info
            </TabsTrigger>
            <TabsTrigger value="applied-jobs">
              <Briefcase className="w-4 h-4 mr-2" />
              Applied Jobs
            </TabsTrigger>
          </TabsList>
        )}

        {/* Tab Contents */}
        <div className="mt-6">
          <TabsContent value="user-info">
            <UserInfoTab />
          </TabsContent>
          
          <TabsContent value="applied-jobs">
            <AppliedJobsTable />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Profile;