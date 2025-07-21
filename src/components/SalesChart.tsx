"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface ChartData {
  name: string;
  total: number;
}

interface SalesChartProps {
  data: ChartData[];
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-[400px]">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Monthly Sales</h3>
      <ResponsiveContainer width="100%" height="90%">
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
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            cursor={{ fill: "rgba(241, 245, 249, 0.5)" }}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
          <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
