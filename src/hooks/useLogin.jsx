import { setUser } from "@/redux/slices/authSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogin = () => {
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (email, password, role) => {
    const data = { email, password, role };
    setIsError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8400/api/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setIsLoading(false);
        dispatch(setUser(res.data));
        toast.success("User Signup Successfullly!");
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(
        error.response?.data?.error || "An error occurred during login"
      );
    }
  };

  return { login, isError, isLoading };
};

export default useLogin;
