import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
const data = [
  { name: "Jan", donated: 2450, wasted: 340, restaurants: 15 },
  { name: "Feb", donated: 3100, wasted: 239, restaurants: 18 },
  { name: "Mar", donated: 2820, wasted: 280, restaurants: 22 },
  { name: "Apr", donated: 3550, wasted: 308, restaurants: 25 },
  { name: "May", donated: 4070, wasted: 367, restaurants: 28 },
  { name: "Jun", donated: 3580, wasted: 249, restaurants: 30 },
];
const DonationChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}kg`}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            `${value}${name === "restaurants" ? "" : "kg"}`,
            name.charAt(0).toUpperCase() + name.slice(1),
          ]}
        />
        <Legend />
        <Bar
          dataKey="donated"
          fill="#3B82F6"
          radius={[4, 4, 0, 0]}
          name="Donated Food"
        />
        <Bar
          dataKey="wasted"
          fill="#EF4444"
          radius={[4, 4, 0, 0]}
          name="Wasted Food"
        />
        <Bar
          dataKey="restaurants"
          fill="#10B981"
          radius={[4, 4, 0, 0]}
          name="Contributing Restaurants"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default DonationChart;
