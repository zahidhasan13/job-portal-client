import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/slices/jobSlice";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchedQuery(searchQuery))
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900 opacity-90"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-600 blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-purple-600 blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-cyan-600 blur-3xl opacity-10"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Find Your <span className="text-blue-400">Dream Job</span> Today
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with thousands of employers and discover opportunities that
            match your skills and career goals.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-xl mx-auto flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 bg-white/10 border-gray-700 backdrop-blur-sm text-white placeholder:text-gray-400 w-full"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-8"
            >
              Search Jobs
            </Button>
          </form>

          {/* Stats */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-blue-400">
                10k+
              </span>
              <span className="text-sm text-gray-400">Job Listings</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-blue-400">
                5k+
              </span>
              <span className="text-sm text-gray-400">Companies</span>
            </div>
            <div className="flex flex-col items-center md:col-span-1 col-span-2">
              <span className="text-2xl md:text-3xl font-bold text-blue-400">
                8M+
              </span>
              <span className="text-sm text-gray-400">Job Seekers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
