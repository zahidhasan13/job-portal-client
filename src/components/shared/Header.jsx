import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setLogOut } from "@/redux/slices/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8400/api/user/logout", {
        withCredentials: true,
      });
      console.log(res);
      if (res.status === 200) {
        dispatch(setLogOut(null));
        navigate("/");
        toast.success("Logout Successfull!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    }
  };

  return (
    <header className="w-full bg-white/50 backdrop-blur-xl border-b border-blue-600 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="ml-2 text-2xl font-bold text-sky-500">
              Job<span className="text-black">Portal</span>
            </span>
          </Link>
        </div>

        {/* Navigation and User Menu */}
        <div className="flex items-center space-x-6">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {user && user.role === "recruiter" ? (
              <>
                <Link
                  to="/recruiter/companies"
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Companies
                </Link>
                <Link
                  to="/recruiter/jobs"
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Jobs
                </Link>
                <Link
                  to="/browse"
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Browse
                </Link>
              </>
            )}

            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 -mr-4"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* User Avatar or Login Button */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.profile.profilePhoto}
                      alt="ProfilePhoto"
                    />
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-sm text-gray-500 truncate max-w-full">
                    {user?.profile.bio}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className="px-5 bg-black text-white">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="px-5 bg-black text-white">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-gray-50 border-t border-gray-200">
          <Link
            to="/jobs"
            className="block py-2 text-gray-600 hover:text-blue-600 font-medium"
          >
            Jobs
          </Link>
          <Link
            to="/companies"
            className="block py-2 text-gray-600 hover:text-blue-600 font-medium"
          >
            Companies
          </Link>
          <Link
            to="/resources"
            className="block py-2 text-gray-600 hover:text-blue-600 font-medium"
          >
            Resources
          </Link>
          <Link
            to="/about"
            className="block py-2 text-gray-600 hover:text-blue-600 font-medium"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
