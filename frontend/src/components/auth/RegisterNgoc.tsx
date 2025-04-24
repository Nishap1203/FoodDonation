import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerNGO } from "../../graphql/ngo"; // Import the registerNGO function



const RegisterNgo = () => {
  const [formData, setFormData] = useState<{ name: string; email: string; phone: string; address: string; password: string; }>({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "", // Add password field
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerNGO(formData); // Use the registerNGO function

      toast.success("NGO registration successful. Awaiting admin approval.");
      setFormData({ name: "", email: "", phone: "", address: "", password: "" }); // Reset form data
      navigate("/login");
    } catch (error: unknown) {


      console.error(error); // Log the error for debugging

      toast.error("Failed to register NGO.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#093637] to-[#44A08D]">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-xl w-96 border border-white/20"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white tracking-wider">
          NGO Registration
        </h2>

        {/* NGO Name */}
        <div className="mb-4">
          <label className="block text-white  font-semibold text-lg">
            NGO Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter NGO Name"
            required
            className="w-full px-4 py-2 border rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#44A08D] focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block  text-white  font-semibold text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
            className="w-full px-4 py-2 border rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#44A08D] focus:outline-none"
          />
        </div>

        {/* Contact */}
        <div className="mb-4">
          <label className="block  text-white  font-semibold text-lg">
            Contact
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Contact Number"
            required
            className="w-full px-4 py-2 border rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#44A08D] focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block  text-white  font-semibold text-lg">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
            className="w-full px-4 py-2 border rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#44A08D] focus:outline-none"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block  text-white  font-semibold text-lg">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
            required
            className="w-full px-4 py-2 border rounded bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-[#44A08D] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#1f433c] text-white text-xl font-bold py-2 rounded hover:bg-[#3f514d] transition duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Register NGO"}
        </button>
      </form>
    </div>
  );
};

export default RegisterNgo;
