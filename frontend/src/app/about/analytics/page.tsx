"use client";

import { useEffect, useState } from "react";

type GA4Row = {
  pagePath: string;
  deviceCategory: string;
  activeUsers: number;
  newUsers: number;
  screenPageViews: number;
};

type Pivoted = {
  pagePath: string;
  desktopActive: number;
  desktopNew: number;
  desktopViews: number;
  mobileActive: number;
  mobileNew: number;
  mobileViews: number;
  totalActive: number;
  totalNew: number;
  totalViews: number;
};

function pivot(rows: GA4Row[]): Pivoted[] {
  const map = new Map<string, Pivoted>();
  for (const {
    pagePath,
    deviceCategory,
    activeUsers,
    newUsers,
    screenPageViews,
  } of rows) {
    if (!pagePath) continue;
    let rec = map.get(pagePath);
    if (!rec) {
      rec = {
        pagePath,
        desktopActive: 0,
        desktopNew: 0,
        desktopViews: 0,
        mobileActive: 0,
        mobileNew: 0,
        mobileViews: 0,
        totalActive: 0,
        totalNew: 0,
        totalViews: 0,
      };
      map.set(pagePath, rec);
    }
    if (deviceCategory === "desktop") {
      rec.desktopActive += activeUsers;
      rec.desktopNew += newUsers;
      rec.desktopViews += screenPageViews;
    } else if (deviceCategory === "mobile") {
      rec.mobileActive += activeUsers;
      rec.mobileNew += newUsers;
      rec.mobileViews += screenPageViews;
    }
    rec.totalActive += activeUsers;
    rec.totalNew += newUsers;
    rec.totalViews += screenPageViews;
  }
  return Array.from(map.values()).sort((a, b) => b.totalViews - a.totalViews);
}

export default function AnalyticsPage() {
  const [data, setData] = useState<Pivoted[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL_6!)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<GA4Row[]>;
      })
      .then((rows) => setData(pivot(rows)))
      .catch(console.error);
  }, []);

  return (
    <div className="py-8 px-4">
      {/* Header & single-line legend */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <h1 className="text-center mt-4 text-3xl font-extrabold">
          Analytics (Last 7 days)
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Active Users (returned) &nbsp;·&nbsp; New Users (first-time)
        </p>
      </div>

      {/* Data table */}
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg relative overflow-x-auto overflow-y-auto max-h-[60vh]">
        <table className="min-w-full table-auto border-collapse">
          <thead className="sticky top-0 z-30 bg-white">
            <tr>
              <th
                rowSpan={2}
                className="sticky left-0 z-40 px-6 py-3 text-left text-s font-bold text-gray-700 uppercase bg-gray-100 border-b border-gray-200"
              >
                Path
              </th>
              <th
                colSpan={3}
                className="px-6 py-3 text-center text-s font-bold text-gray-700 uppercase bg-blue-100 border-b border-gray-200"
              >
                Desktop
              </th>
              <th
                colSpan={3}
                className="px-6 py-3 text-center text-s font-bold text-gray-700 uppercase bg-green-100 border-b border-gray-200"
              >
                Mobile
              </th>
              <th
                colSpan={3}
                className="px-6 py-3 text-center text-s font-bold text-gray-700 uppercase bg-yellow-100 border-b border-gray-200"
              >
                Total
              </th>
            </tr>
            <tr className="bg-white">
              {[
                "Active",
                "New",
                "Views",
                "Active",
                "New",
                "Views",
                "Active",
                "New",
                "Views",
              ].map((label, idx) => {
                const bg =
                  idx < 3
                    ? "bg-blue-50"
                    : idx < 6
                      ? "bg-green-50"
                      : "bg-yellow-50";
                return (
                  <th
                    key={idx}
                    className={`${bg} px-4 py-2 text-right text-xs font-bold text-gray-600 uppercase border-b border-gray-200`}
                  >
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr
                key={r.pagePath}
                className={`
                  border-b border-gray-200
                  group hover:bg-gray-100
                  ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                `}
              >
                <td className="sticky left-0 z-20 px-6 py-4 whitespace-nowrap text-s font-semibold text-gray-800 bg-white">
                  {r.pagePath}
                </td>
                {[
                  r.desktopActive,
                  r.desktopNew,
                  r.desktopViews,
                  r.mobileActive,
                  r.mobileNew,
                  r.mobileViews,
                  r.totalActive,
                  r.totalNew,
                  r.totalViews,
                ].map((value, idx) => {
                  const bg =
                    idx < 3
                      ? "bg-blue-50"
                      : idx < 6
                        ? "bg-green-50"
                        : "bg-yellow-50";
                  const bold =
                    idx >= 6 ? "font-semibold text-gray-900" : "text-gray-700";
                  return (
                    <td
                      key={idx}
                      className={`${bg} px-4 py-4 whitespace-nowrap text-s text-right ${bold}`}
                    >
                      {value.toLocaleString()}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
