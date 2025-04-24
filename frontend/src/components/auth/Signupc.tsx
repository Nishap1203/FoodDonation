import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { signup } from "../../graphql/auth";

import {
  notifySuccess,
  notifyError,
} from "../common/ToastNotification";

const SignupSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof SignupSchema>;

const Signupc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
  });
 
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      await signup({
        email: data.email,
        password: data.password,
      });


      localStorage.setItem("signupEmail", data.email);

      notifySuccess("Signup successful! Check your email for confirmation.");
      navigate("/confirm-signup", { state: { email: data.email } });
    } catch {
     notifyError("Signup failed. Try again.",errors);


    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#093637] to-[#44A08D]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-xl w-96 border border-white/20"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-white tracking-wider">
          USER SIGNUP
        </h2>

        <label className="block text-white/80 font-medium">Email</label>
        <input
          {...register("email")}
          type="email"
          className="border p-2 w-full rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#44A08D] focus:outline-none"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}

        <label className="block mt-3 text-white/80 font-medium">Password</label>
        <input
          {...register("password")}
          type="password"
          className="border p-2 w-full rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#44A08D] focus:outline-none"
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
        )}

        <label className="block mt-3 text-white/80 font-medium">
          Confirm Password
        </label>
        <input
          {...register("confirmPassword")}
          type="password"
          className="border p-2 w-full rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#6044a0] focus:outline-none"
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <p className="text-red-400 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          type="submit"
          className="bg-[#1f433c] text-white p-2 rounded w-full mt-4 hover:bg-[#3f514d] transition duration-300 disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "SIGN UP"}
        </button>

        <p className="text-center text-white/70 mt-3 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#051512] underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signupc;
