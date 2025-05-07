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
      {/* Header & legend */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <h1 className="text-3xl font-extrabold">Analytics (Last 7 days)</h1>
        <p className="mt-2 text-sm text-gray-500">
          Active Users (returned) &nbsp;·&nbsp; New Users (first-time)
        </p>
      </div>

      {/* scroll‐wrapper: both‐axis scroll + bottom padding so rows don't hide under footer */}
      <div
        className="
          max-w-7xl mx-auto
          bg-white shadow rounded-lg
          overflow-auto           /* both axes */
          max-h-[60vh]            /* cap height */
          pb-16                   /* <-- space for footer (4rem) */
          relative z-0
        "
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x pan-y",
        }}
      >
        <table className="min-w-full table-auto border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th
                rowSpan={2}
                className="sticky left-0 z-10 px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase bg-gray-100 border-b border-gray-200"
              >
                Path
              </th>
              <th
                colSpan={3}
                className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase bg-blue-100 border-b"
              >
                Desktop
              </th>
              <th
                colSpan={3}
                className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase bg-green-100 border-b"
              >
                Mobile
              </th>
              <th
                colSpan={3}
                className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase bg-yellow-100 border-b"
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
              ].map((lbl, i) => {
                const bg =
                  i < 3 ? "bg-blue-50" : i < 6 ? "bg-green-50" : "bg-yellow-50";
                return (
                  <th
                    key={i}
                    className={`${bg} px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase border-b`}
                  >
                    {lbl}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr
                key={r.pagePath}
                className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-200 hover:bg-gray-100`}
              >
                <td className="sticky left-0 z-0 px-6 py-3 whitespace-nowrap font-semibold text-gray-800 bg-white">
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
                ].map((v, idx) => {
                  const bg =
                    idx < 3
                      ? "bg-blue-50"
                      : idx < 6
                        ? "bg-green-50"
                        : "bg-yellow-50";
                  const fw =
                    idx >= 6 ? "font-semibold text-gray-900" : "text-gray-700";
                  return (
                    <td
                      key={idx}
                      className={`${bg} px-4 py-3 whitespace-nowrap text-right ${fw}`}
                    >
                      {v.toLocaleString()}
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
