import { useState } from "react";
import { forgotPassword } from "../../graphql/auth";
import {
  notifySuccess,
  notifyError,
} from "../common/ToastNotification";

const ForgotPasswordc = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
      notifySuccess("Reset email sent!");
    } catch {
      notifyError("Error sending reset email.",Error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#093637] to-[#44A08D]">
      <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-xl w-96 border border-white/20">
        <h2 className="text-xl font-semibold mb-4 text-center text-white tracking-wider">
          FORGOT PASSWORD
        </h2>
        <p className="text-sm text-center text-white mb-6">
          Enter your email to receive a password reset link.
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-white font-semibold">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#44A08D] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleForgotPassword}
          className="w-full bg-[#1f433c] text-white font-semibold py-2 rounded hover:bg-[#3f514d] transition duration-300"
        >
          Send Reset Email
        </button>

        {/* Back to Login */}
        <p className="text-center  text-white mt-4 text-sm">
          Remember your password?{" "}
          <a href="/login" className="text-[#051512] underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordc;
