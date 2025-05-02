// "use client";

// import { useEffect, useState } from "react";

// type GA4Row = {
//   pagePath: string;
//   deviceCategory: "desktop" | "mobile" | string;
//   activeUsers: number;
//   newUsers: number;
//   screenPageViews: number;
// };

// type Pivoted = {
//   pagePath: string;
//   desktopActive: number;
//   desktopNew: number;
//   desktopViews: number;
//   mobileActive: number;
//   mobileNew: number;
//   mobileViews: number;
//   totalActive: number;
//   totalNew: number;
//   totalViews: number;
// };

// function pivot(rows: GA4Row[]): Pivoted[] {
//   const map = new Map<string, Pivoted>();
//   for (const {
//     pagePath,
//     deviceCategory,
//     activeUsers,
//     newUsers,
//     screenPageViews,
//   } of rows) {
//     if (!pagePath) continue;
//     let rec = map.get(pagePath);
//     if (!rec) {
//       rec = {
//         pagePath,
//         desktopActive: 0,
//         desktopNew: 0,
//         desktopViews: 0,
//         mobileActive: 0,
//         mobileNew: 0,
//         mobileViews: 0,
//         totalActive: 0,
//         totalNew: 0,
//         totalViews: 0,
//       };
//       map.set(pagePath, rec);
//     }
//     if (deviceCategory === "desktop") {
//       rec.desktopActive += activeUsers;
//       rec.desktopNew += newUsers;
//       rec.desktopViews += screenPageViews;
//     } else if (deviceCategory === "mobile") {
//       rec.mobileActive += activeUsers;
//       rec.mobileNew += newUsers;
//       rec.mobileViews += screenPageViews;
//     }
//     rec.totalActive += activeUsers;
//     rec.totalNew += newUsers;
//     rec.totalViews += screenPageViews;
//   }
//   return Array.from(map.values()).sort((a, b) => b.totalViews - a.totalViews);
// }

// export default function AnalyticsPage() {
//   const [data, setData] = useState<Pivoted[]>([]);

//   useEffect(() => {
//     const url = process.env.NEXT_PUBLIC_API_URL_6!;
//     fetch(url)
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return res.json() as Promise<GA4Row[]>;
//       })
//       .then((rows) => setData(pivot(rows)))
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="py-8 px-4">
//       <h1 className="text-2xl font-semibold text-center mb-6">
//         Analytics (Last 7 days)
//       </h1>
//       <div className="max-w-7xl mx-auto bg-white shadow rounded-lg overflow-x-auto overflow-y-auto max-h-[70vh]">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50 sticky top-0">
//             <tr>
//               <th
//                 rowSpan={2}
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
//               >
//                 Path
//               </th>
//               <th
//                 colSpan={3}
//                 className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
//               >
//                 Desktop
//               </th>
//               <th
//                 colSpan={3}
//                 className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
//               >
//                 Mobile
//               </th>
//               <th
//                 colSpan={3}
//                 className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
//               >
//                 Total
//               </th>
//             </tr>
//             <tr className="bg-gray-100">
//               {Array.from({ length: 9 }).map((_, idx) => (
//                 <th
//                   key={idx}
//                   className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase"
//                 >
//                   {["Active", "New", "Views"][idx % 3]}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {data.map((r, i) => (
//               <tr
//                 key={r.pagePath}
//                 className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {r.pagePath}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
//                   {r.desktopActive.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
//                   {r.desktopNew.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
//                   {r.desktopViews.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
//                   {r.mobileActive.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
//                   {r.mobileNew.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
//                   {r.mobileViews.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 text-right">
//                   {r.totalActive.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 text-right">
//                   {r.totalNew.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 text-right">
//                   {r.totalViews.toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

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
      <h1 className="text-2xl font-semibold text-center mb-6">
        Analytics (Last 7 days)
      </h1>
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg overflow-auto max-h-[70vh]">
        <table className="min-w-full table-auto border-collapse">
          <thead className="sticky top-0">
            <tr>
              <th
                rowSpan={2}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase bg-gray-100"
              >
                Path
              </th>
              <th
                colSpan={3}
                className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase bg-blue-100"
              >
                Desktop
              </th>
              <th
                colSpan={3}
                className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase bg-green-100"
              >
                Mobile
              </th>
              <th
                colSpan={3}
                className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase bg-yellow-100"
              >
                Total
              </th>
            </tr>
            <tr>
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
                    className={`px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase ${bg}`}
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
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
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
                      className={`px-4 py-4 whitespace-nowrap text-sm text-right ${bg} ${bold}`}
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
