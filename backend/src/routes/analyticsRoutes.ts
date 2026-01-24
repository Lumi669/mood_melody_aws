import { Router } from "express";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

type AnalyticsRow = {
  pagePath: string;
  pageTitle: string;
  deviceCategory: string;
  activeUsers: number;
  newUsers: number;
  screenPageViews: number;
};

const router = Router();
const ssm = new SSMClient({ region: process.env.AWS_REGION || "eu-north-1" });
const PROPERTY_ID = process.env.GA4_PROPERTY_ID!;

let analyticsClient: BetaAnalyticsDataClient | null = null;
async function getClient() {
  if (analyticsClient) return analyticsClient;
  const resp = await ssm.send(
    new GetParameterCommand({
      Name: "/mood-melody/GA4_SERVICE_ACCOUNT_JSON",
      WithDecryption: true,
    }),
  );
  const creds = JSON.parse(resp.Parameter!.Value!);
  analyticsClient = new BetaAnalyticsDataClient({
    credentials: creds,
    projectId: creds.project_id,
  });
  return analyticsClient;
}

router.get("/", async (_req, res, next) => {
  try {
    const client = await getClient();
    const [report] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [
        { name: "pagePath" },
        { name: "pageTitle" },
        { name: "deviceCategory" },
      ],
      metrics: [
        { name: "activeUsers" },
        { name: "newUsers" },
        { name: "screenPageViews" },
      ],
    });

    // Ensure rows is defined, default to []
    const rows = report.rows ?? [];

    console.log("GA4 rows:", rows);

    // Map safely with optional chaining & defaults
    const data: AnalyticsRow[] = rows.map((r) => ({
      pagePath: r.dimensionValues?.[0]?.value ?? "",
      pageTitle: r.dimensionValues?.[1]?.value ?? "",
      deviceCategory: r.dimensionValues?.[2]?.value ?? "",
      activeUsers: Number(r.metricValues?.[0]?.value) || 0,
      newUsers: Number(r.metricValues?.[1]?.value) || 0,
      screenPageViews: Number(r.metricValues?.[2]?.value) || 0,
    }));

    console.log("GA4 rows========:", rows);

    res.json(data);
  } catch (err: any) {
    console.error("❌ GA4 error in /api/analytics/data:", err);
    return res.status(500).json({ error: err.message || "Unknown GA4 error" });

    // next(err);
  }
});

export default router;
