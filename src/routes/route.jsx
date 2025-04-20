import App from "@/App";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import About from "@/pages/About";
import Applicants from "@/pages/Applicants";
import Browse from "@/pages/Browse";
import CompanyDetails from "@/pages/CompanyDetails";
import CreateCompany from "@/pages/CreateCompany";
import Home from "@/pages/Home";
import JobDetails from "@/pages/JobDetails";
import JobPost from "@/pages/JobPost";
import Jobs from "@/pages/Jobs";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import RecruiterCompanies from "@/pages/RecruiterCompanies";
import RecruiterJobs from "@/pages/RecruiterJobs";
import UpdateCompanyForm from "@/pages/UpdateCompanyForm";
import UpdateJobPost from "@/pages/UpdateJobPost";
import UpdateProfileForm from "@/pages/UpdateProfileForm";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";



const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path:"/",
          element: <Home/>
        },
        {
          path:"/jobs",
          element: <Jobs/>
        },
        {
          path:"/job-details/:id",
          element: <PrivateRoute><JobDetails/></PrivateRoute>
        },
        {
          path:"/browse",
          element: <Browse/>
        },
        {
          path:"/recruiter/companies",
          element: <AdminRoute><RecruiterCompanies/></AdminRoute>
        },
        {
          path:"/recruiter/companies/company-details/:id",
          element: <AdminRoute><CompanyDetails/></AdminRoute>
        },
        {
          path:"/recruiter/companies/create-company",
          element: <AdminRoute><CreateCompany/></AdminRoute>
        },
        {
          path:"/recruiter/companies/update-company",
          element: <AdminRoute><UpdateCompanyForm/></AdminRoute>
        },
        {
          path:"/recruiter/jobs",
          element: <AdminRoute><RecruiterJobs/></AdminRoute>
        },
        {
          path:"/recruiter/job/create",
          element: <AdminRoute><JobPost/></AdminRoute>
        },
        {
          path:"/recruiter/job/update",
          element: <AdminRoute><UpdateJobPost/></AdminRoute>
        },
        {
          path:"/recruiter/job/:id/applicants",
          element: <AdminRoute><Applicants/></AdminRoute>
        },
        {
          path:"/about",
          element: <About/>
        },
        {
          path:"/profile",
          element: <PrivateRoute><Profile/></PrivateRoute>
        },
        {
          path:"/profile/update",
          element: <PrivateRoute><UpdateProfileForm/></PrivateRoute>
        },
      ]
    },
    {
      path: '/signup',
      element: <Signup/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '*',
      element: <NotFound/>
    }
  ]);

  export default router;