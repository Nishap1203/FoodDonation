import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../graphql/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice"; 
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  notifySuccess,
  notifyError,
} from "../common/ToastNotification";
import { ApolloError } from "@apollo/client";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Loginc = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormInputs) => {
    setLoginError(null);
    setLoading(true);
    try {
      const responseData = await login(data);
      localStorage.setItem("token",responseData.token)
      console.log(responseData)
      if (!responseData ||  !responseData.user) {
        throw new Error("Invalid Credentials!");
      }


      
      if (responseData.user) {
        const { role } = responseData.user;
        dispatch(setUser(responseData.user));

        notifySuccess("Login successful!");
        if (role === "DONOR") {
          navigate("/dashboard/donor-dashboard");
        } else if (role === "NGO") {
          navigate("/dashboard/ngo-dashboard");
        } else if (role === "ADMIN") {
          navigate("/dashboard/admin-dashboard");
        } else {
          navigate("/"); 
        }
      } else {
        notifyError("No user data received. Please try again.");
      }
    } catch (error: unknown) {
      let message = "Login failed. Please try again.";

      // if (error instanceof ApolloError) {
      //   if (error.networkError) {
      //     message = "Network error. Please check your connection.";
      //   } else if (error.message) {
      //     message = error.message;
      //   }
      // } else if (error instanceof Error) {
      //   message = error.message;
      // }

      if (error instanceof ApolloError) {
        console.error("ApolloError:", error); // Log error to console
        if (error.networkError) {
          console.error("Network Error Details:", error.networkError);
          message = "Network error. Please check your connection.";
        } else if (error.message) {
          message = error.message;
        }
      } else if (error instanceof Error) {
        console.error("Error:", error);
        message = error.message;
      }

      setLoginError(message);
      notifyError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#093637] to-[#44A08D]">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-xl w-96 border border-white/20"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-white tracking-wider">
          USER LOGIN
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-white/80 font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#44A08D] focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-white/80 font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#44A08D] focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between text-white/70 text-sm mb-4">
          <div>
            <input type="checkbox" id="remember" className="mr-1" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <Link
            to="/forgot-password"
            className="hover:underline text-[#051512]"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1f433c] text-white font-semibold py-2 rounded hover:bg-[#3f514d] transition duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
        >
        {loading ? "Logging in..." : "Login"}

        </button>
        {loginError && (
          <p className="text-red-400 text-sm mt-2 text-center">{loginError}</p>
        )}

        {/* Signup Redirect */}
        <p className="text-center text-white/70 mt-3 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#051512] underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Loginc;
