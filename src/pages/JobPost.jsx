import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setSingleJob } from "@/redux/slices/jobSlice";

const JobPost = () => {
  const { companies } = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      companyId: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8400/api/job", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res.data.populatedJob);
      console.log(res.data.success);
      if (res.data.success) {
        toast.success("Job created successfully");
        dispatch(setSingleJob(res.data.populatedJob));
        navigate("/recruiter/job/update");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="my-10 min-h-screen">
      <h2 className="text-center text-4xl uppercase font-bold">
        Create New Job
      </h2>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          {companies.length === 0 && (
            <div className="mb-4 text-center">
              <p className="text-rose-600 text-lg">
                *Please create a company before posting a job
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Senior Frontend Developer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Company</FormLabel>
                      <Select
                        onValueChange={field.onChange} // This ensures the selected value is passed to the form
                        defaultValue={field.value} // Set the default value from the form's initial data
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select company" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companies.map((company) => (
                            <SelectItem
                              key={company?._id}
                              value={company?._id?.toString()}
                            >
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Create Job Posting</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPost;
