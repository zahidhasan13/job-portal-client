import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/slices/companySlice";

const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        const res = await axios.post('http://localhost:8400/api/company/register', data,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        if(res.data.success){
            dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            navigate("/recruiter/companies/update-company");
        }
    } catch (error) {
        toast.error(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto py-6 px-20 h-screen">
      {/* Headline */}
      <h1 className="text-4xl font-bold mb-2">Company Name</h1>
      {/* Subheading */}
      <p className="text-sm text-gray-600 mb-6">
        Please enter your company name to get started. You can change this
        later.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-10">
          {/* Label and Input */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Enter your company name"
              className="mt-1"
              {...register("companyName", {
                required: "Company name is required",
              })}
            />
            {errors.companyName && (
              <p className="text-sm text-red-500">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Link to="/recruiter/companies">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Continue</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCompany;