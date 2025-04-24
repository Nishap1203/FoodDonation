import type React from "react";
interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
  className?: string;
}
export default function StatsCard({
  title,
  value,
  icon,
  trend,
  className = "",
}: StatsCardProps) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
}
