import type React from "react";
interface StatusCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}
const StatusCard = ({ title, value, change, icon }: StatusCardProps) => {
  const isPositive = change.startsWith("+");
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p
          className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {change} from last month
        </p>
      </div>
    </div>
  );
};
export default StatusCard;
