import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import { confirmSignup, resendOtp } from "../../graphql/auth";

import {
  notifySuccess,
  notifyError,
} from "../common/ToastNotification";
// import { error } from "console";


// ✅ Schema for OTP validation
const ConfirmSignupSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

type ConfirmSignupFormData = z.infer<typeof ConfirmSignupSchema>;

const ConfirmSignupc = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmSignupFormData>({
    resolver: zodResolver(ConfirmSignupSchema),
  });

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const storedEmail = localStorage.getItem("signupEmail");
  const email = location.state?.email || storedEmail;

  if (!email) {
    notifyError("Invalid access. Please sign up first.",errors);
    navigate("/signup");
    return null;
  }

  const onSubmit = async (data: ConfirmSignupFormData) => {
    setLoading(true);
    try {
      // ✅ Send OTP verification request
      console.log("Sending email & OTP:", { email, otp: data.otp });

      await confirmSignup({
        email,
        code: data.otp,
      });


      notifySuccess("Account verified! You can now log in.");
      navigate("/login"); // Redirect to login page
    } catch {
      const errorMessage = "Invalid OTP try again!";



      notifyError(errorMessage,errors);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Resend OTP
  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await resendOtp({
        email,
      });


      notifySuccess("A new OTP has been sent to your email!");
      setCountdown(30); // Start 30s countdown
    } catch {
      const errorMessage = "Failed to resend OTP!";


      notifyError(errorMessage,errors);
    } finally {
      setResendLoading(false);
    }
  };

  // ✅ Countdown Timer Effect
   // eslint-disable-next-line react-hooks/rules-of-hooks
   useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#003d3d] to-[#005f5f]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold  text-green-50 text-center mb-4">
          Confirm Signup
        </h2>
        <p className="text-sm text-green-50 text-center mb-6">
          Enter the OTP sent to {email}
        </p>

        <label className="block text-white/80 font-medium mt-4">OTP</label>
        <input
          {...register("otp")}
          className="w-full px-4 py-2 border border-white/30 rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-teal-400 focus:outline-none"
        />
        {errors.otp && (
          <p className="text-red-400 text-sm mt-1">{errors.otp.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 mt-4 transition duration-300"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Confirm"}
        </button>

        {/* ✅ Resend OTP Button */}
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={resendLoading || countdown > 0}
          className={`w-full mt-3 py-2 text-blue-900 font-semibold rounded-lg transition duration-300 ${
            resendLoading || countdown > 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-200 hover:bg-green-50"
          }`}
        >
          {resendLoading
            ? "Resending..."
            : countdown > 0
              ? `Resend OTP in ${countdown}s`
              : "Resend OTP"}
        </button>
      </form>
    </div>
  );
};

export default ConfirmSignupc;
