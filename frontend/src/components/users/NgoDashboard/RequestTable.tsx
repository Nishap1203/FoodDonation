import { useState } from "react";
import type { DonationRequest } from "../../../components/users/NgoDashboard/types";
interface RequestTableProps {
  requests: DonationRequest[];
  onStatusChange: (id: string, status: "approved" | "rejected") => void;
}
export default function RequestTable({
  requests,
  onStatusChange,
}: RequestTableProps) {
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const filteredRequests = requests.filter(
    (request) => filter === "all" || request.status === filter
  );
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold">Donation Requests</h3>
        <div className="mt-4 flex gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                  filter === status
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="px-6 py-3 text-sm font-medium text-gray-500">
                Donor
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">
                Food Type
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">
                Quantity
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">
                Servings
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">
                Location
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id} className="border-b border-gray-100">
                <td className="px-6 py-4">{request.donorName}</td>
                <td className="px-6 py-4">{request.foodType}</td>
                <td className="px-6 py-4">{request.quantity}</td>
                <td className="px-6 py-4">{request.servings}</td>
                <td className="px-6 py-4">{request.location}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${
                        request.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : request.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    `}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onStatusChange(request.id, "approved")}
                        className="px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onStatusChange(request.id, "rejected")}
                        className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
