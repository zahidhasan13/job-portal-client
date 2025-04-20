import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

// Define the schema for form validation using Zod
// const profileSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
//   bio: z.string().optional(),
//   skills: z.array(z.string()).optional(),
//   description: z.string().optional(),
//   address: z.string().optional(),
//   resume: z.string().optional(),
//   resumeOriginalName: z.string().optional(),
//   company: z.string().optional(),
//   profilePhoto: z.string().optional(),
// });

const UpdateProfileForm = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills || "",
      description: user?.profile?.description || "",
      address: user?.profile?.address || "",
      profilePhoto: null, // Use a unique name for profile photo
      resume: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append all fields to formData
      Object.keys(data).forEach((key) => {
        if (key === "profilePhoto" || key === "resume") {
          if (data[key]) {
            formData.append(key, data[key]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = await axios.post(
        "http://localhost:8400/api/user/profile/update",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        toast.success("Updated Successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    form.setValue("profilePhoto", file);
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    form.setValue("resume", file);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-4xl my-10 font-bold text-center border-b-2 border-black pb-2 uppercase">
        Update Profile
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-5 space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Profile Photo */}
          <FormField
            control={form.control}
            name="profilePhoto"
            render={() => (
              <FormItem>
                <FormLabel>Profile Photo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={handleProfilePhotoChange}
                    accept=".jpg,.png,.jpeg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
{
  user?.role === "jobseeker" && <div>
    
          {/* Skills */}
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your skills (comma separated)"
                    value={field.value?.join(", ")}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((s) => s.trim())
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resume */}
          <FormField
            control={form.control}
            name="resume"
            render={() => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={handleResumeChange}
                    accept=".pdf, .doc, .docx"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

  </div>
}
          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProfileForm;
