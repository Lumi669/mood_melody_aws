"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Row = {
  pagePath: string;
  pageTitle: string;
  deviceCategory: string;
  activeUsers: number;
  newUsers: number;
  screenPageViews: number;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE!;
    fetch(`${base}/api/analytics/data`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((rows: Row[]) => setData(rows))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Analytics (Last 7 days)</h1>

      {/* 1. TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Path</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Device</th>
              <th className="border px-4 py-2">Active Users</th>
              <th className="border px-4 py-2">New Users</th>
              <th className="border px-4 py-2">Page Views</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border px-4 py-2">{r.pagePath}</td>
                <td className="border px-4 py-2">{r.pageTitle}</td>
                <td className="border px-4 py-2">{r.deviceCategory}</td>
                <td className="border px-4 py-2 text-right">{r.activeUsers}</td>
                <td className="border px-4 py-2 text-right">{r.newUsers}</td>
                <td className="border px-4 py-2 text-right">
                  {r.screenPageViews}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. BAR CHART */}
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="pagePath"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="activeUsers" name="Active Users" stackId="a" />
            <Bar dataKey="newUsers" name="New Users" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
