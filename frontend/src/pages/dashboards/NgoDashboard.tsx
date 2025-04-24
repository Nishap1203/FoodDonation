
import { useState } from "react";
import { Package2, Users, Utensils } from "lucide-react";
import type {
  DonationRequest,
  DonationStats,
} from "../../components/users/NgoDashboard/types";
import StatsCard from "../../components/users/NgoDashboard/StatusCard";
import DonationChart from "../../components/users/NgoDashboard/DonationRequestsChart";
import StatusDistribution from "../../components/users/NgoDashboard/Statusdistribution";
import RequestTable from "../../components/users/NgoDashboard/RequestTable";

const initialRequests: DonationRequest[] = [
  {
    id: "1",
    donorName: "John Doe",
    foodType: "Cooked Meals",
    quantity: 50,
    servings: 100,
    requestDate: "2024-02-21",
    status: "pending",
    location: "Downtown",
  },
  
];
const stats: DonationStats = {
  totalRequests: 150,
  approvedRequests: 120,
  rejectedRequests: 20,
  pendingRequests: 10,
  totalServings: 5000,
  monthlyDonations: [
    { month: "Jan", amount: 450 },
    { month: "Feb", amount: 560 },
    { month: "Mar", amount: 380 },
    { month: "Apr", amount: 690 },
    { month: "May", amount: 520 },
  ],
  requestStatus: [
    { status: "Pending", count: 10 },
    { status: "Approved", count: 120 },
    { status: "Rejected", count: 20 },
  ],
};
export default function NGODashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const handleStatusChange = (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">NGO Dashboard</h1>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Requests"
            value={stats.totalRequests}
            icon={<Package2 size={24} />}
            trend={12}
          />
          <StatsCard
            title="Total Servings"
            value={stats.totalServings}
            icon={<Utensils size={24} />}
            trend={8}
          />
          <StatsCard
            title="Approval Rate"
            value={Math.round(
              (stats.approvedRequests / stats.totalRequests) * 100
            )}
            icon={<Users size={24} />}
            trend={-3}
          />
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DonationChart data={stats.monthlyDonations} />
          <StatusDistribution data={stats.requestStatus} />
        </div>
        {/* Requests Table */}
        <RequestTable requests={requests} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}
