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

type GA4Row = {
  pagePath: string;
  deviceCategory: "desktop" | "mobile" | string;
  activeUsers: number;
  newUsers: number;
  screenPageViews: number;
};

type Pivoted = {
  pagePath: string;
  desktopActive: number;
  desktopNew: number;
  mobileActive: number;
  mobileNew: number;
  totalActive: number;
  totalNew: number;
};

function pivot(rows: GA4Row[]): Pivoted[] {
  const map = new Map<string, Pivoted>();
  for (const { pagePath, deviceCategory, activeUsers, newUsers } of rows) {
    if (pagePath === "" || pagePath === "/?") continue;
    let rec = map.get(pagePath);
    if (!rec) {
      rec = {
        pagePath,
        desktopActive: 0,
        desktopNew: 0,
        mobileActive: 0,
        mobileNew: 0,
        totalActive: 0,
        totalNew: 0,
      };
      map.set(pagePath, rec);
    }
    if (deviceCategory === "desktop") {
      rec.desktopActive += activeUsers;
      rec.desktopNew += newUsers;
    } else if (deviceCategory === "mobile") {
      rec.mobileActive += activeUsers;
      rec.mobileNew += newUsers;
    }
    rec.totalActive += activeUsers;
    rec.totalNew += newUsers;
  }

  return Array.from(map.values()).sort((a, b) => b.totalActive - a.totalActive);
}

export default function AnalyticsPage() {
  const [data, setData] = useState<Pivoted[]>([]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL_6!;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<GA4Row[]>;
      })
      .then((rows) => setData(pivot(rows)))
      .catch(console.error);
  }, []);

  // Top 10 pages for chart
  const chartData = data.slice(0, 10);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Analytics (Last 7 days)</h1>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] table-auto border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr className="bg-gray-200">
              <th rowSpan={2} className="border px-4 py-2 text-left">
                Path
              </th>
              <th colSpan={2} className="border px-4 py-2 text-center">
                Desktop
              </th>
              <th colSpan={2} className="border px-4 py-2 text-center">
                Mobile
              </th>
              <th colSpan={2} className="border px-4 py-2 text-center">
                Total
              </th>
            </tr>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-right">Active</th>
              <th className="border px-4 py-2 text-right">New</th>
              <th className="border px-4 py-2 text-right">Active</th>
              <th className="border px-4 py-2 text-right">New</th>
              <th className="border px-4 py-2 text-right">Active</th>
              <th className="border px-4 py-2 text-right">New</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr
                key={r.pagePath}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-4 py-2">{r.pagePath}</td>
                <td className="border px-4 py-2 text-right">
                  {r.desktopActive.toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-right">
                  {r.desktopNew.toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-right">
                  {r.mobileActive.toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-right">
                  {r.mobileNew.toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-right font-bold">
                  {r.totalActive.toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-right font-bold">
                  {r.totalNew.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GROUPED BAR CHART */}
      <div className="w-full" style={{ height: 500 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="pagePath"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip
              formatter={(v) =>
                typeof v === "number" ? v.toLocaleString() : v
              }
            />
            <Legend />
            <Bar dataKey="desktopActive" name="Desktop Active" fill="#4F46E5" />
            <Bar dataKey="mobileActive" name="Mobile Active" fill="#10B981" />
            <Bar dataKey="totalActive" name="Total Active" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
