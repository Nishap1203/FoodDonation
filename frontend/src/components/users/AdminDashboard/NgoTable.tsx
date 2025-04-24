import { useState } from "react";
interface NGO {
  id: string;
  name: string;
  email: string;
  status: "pending" | "verified" | "rejected";
  createdAt: string;
  location: string;
  foodRequirement: string;
}
const mockNGOs: NGO[] = [
  {
    id: "1",
    name: "Food For All Foundation",
    email: "contact@foodforall.org",
    status: "pending",
    createdAt: "2024-02-15",
    location: "Mumbai, India",
    foodRequirement: "500kg/month",
  },
  {
    id: "2",
    name: "Helping Hands Society",
    email: "info@helpinghands.org",
    status: "verified",
    createdAt: "2024-02-14",
    location: "Delhi, India",
    foodRequirement: "750kg/month",
  },
  {
    id: "3",
    name: "Care Foundation",
    email: "hello@care.org",
    status: "pending",
    createdAt: "2024-02-13",
    location: "Bangalore, India",
    foodRequirement: "300kg/month",
  },
  {
    id: "4",
    name: "Hope NGO",
    email: "support@hope.org",
    status: "rejected",
    createdAt: "2024-02-12",
    location: "Chennai, India",
    foodRequirement: "450kg/month",
  },
  {
    id: "5",
    name: "Seva Foundation",
    email: "info@seva.org",
    status: "pending",
    createdAt: "2024-02-11",
    location: "Hyderabad, India",
    foodRequirement: "600kg/month",
  },
];
const NGOTable = () => {
  const [ngos, setNgos] = useState<NGO[]>(mockNGOs);
  const handleApprove = (id: string) => {
    setNgos(
      ngos.map((ngo) => (ngo.id === id ? { ...ngo, status: "verified" } : ngo))
    );
  };
  const handleReject = (id: string) => {
    setNgos(
      ngos.map((ngo) => (ngo.id === id ? { ...ngo, status: "rejected" } : ngo))
    );
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Requirement
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ngos.map((ngo) => (
            <tr key={ngo.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {ngo.name}
                </div>
                <div className="text-sm text-gray-500">{ngo.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ngo.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ngo.foodRequirement}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${
                    ngo.status === "verified"
                      ? "bg-green-100 text-green-800"
                      : ngo.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {ngo.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(ngo.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                {ngo.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(ngo.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(ngo.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default NGOTable;
