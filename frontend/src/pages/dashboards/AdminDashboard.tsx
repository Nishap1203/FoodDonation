"use client";
import { useState } from "react";
// import { useQuery } from "@apollo/client";
// import { GET_ADMIN_DASHBOARD_DATA } from "../../graphql/queries";

import { FaChartPie, FaUsers, FaUtensils } from "react-icons/fa";
import DonationChart from "../../components/users/AdminDashboard/DonationChart";
import NgoTable from "../../components/users/AdminDashboard/NgoTable";
import StatusCard from "../../components/users/AdminDashboard/StatusCard";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  // const { loading, error, data } = useQuery(GET_ADMIN_DASHBOARD_DATA);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const stats = {
    totalDonated: {
      value: "12,350 kg",
      change: "+20.1%", 
      lastMonth: "10,280 kg", 
    },
    foodWastage: {
      value: "1,245 kg",
      change: "-4%", 
      lastMonth: "1,297 kg",
    },
    registeredNGOs: {
      value: "48",
      change: "+12", 
      lastMonth: "36", 
    },
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}{" "}
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    
      <div className="grid gap-6 md:grid-cols-3">
        <StatusCard
          title="Total Food Donated"
          value={stats.totalDonated.value}
          change={stats.totalDonated.change}
          icon={<FaChartPie className="w-6 h-6" />}
        />
        <StatusCard
          title="Food Wastage"
          value={stats.foodWastage.value}
          change={stats.foodWastage.change}
          icon={<FaUtensils className="w-6 h-6" />}
        />
        <StatusCard
          title="Registered NGOs"
          value={stats.registeredNGOs.value}
          change={stats.registeredNGOs.change}
          icon={<FaUsers className="w-6 h-6" />}
        />
      </div>
    
      <div className="space-y-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("ngo-requests")}
              className={`${
                activeTab === "ngo-requests"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              NGO Requests
            </button>
          </nav>
        </div>
   
        <div className="bg-white rounded-lg shadow">
          {activeTab === "overview" ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Food Donation vs Wastage Overview
                </h2>
                <div className="text-sm text-gray-500">
                  Total Restaurants Contributing: 30
                </div>
              </div>
              <DonationChart />
            </div>
          ) : (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">NGO Requests</h2>
                <div className="text-sm text-gray-500">
                  Pending Approvals: 3
                </div>
              </div>
              <NgoTable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
