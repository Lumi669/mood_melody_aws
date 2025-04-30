import { Router } from "express";
import AWS from "aws-sdk";
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
const ssm = new AWS.SSM();
const PROPERTY_ID = process.env.GA4_PROPERTY_ID!;

let analyticsClient: BetaAnalyticsDataClient | null = null;
async function getClient() {
  if (analyticsClient) return analyticsClient;
  const resp = await ssm
    .getParameter({ Name: "GA4_SERVICE_ACCOUNT_JSON", WithDecryption: true })
    .promise();
  const creds = JSON.parse(resp.Parameter!.Value!);
  analyticsClient = new BetaAnalyticsDataClient({
    credentials: creds,
    projectId: creds.project_id,
  });
  return analyticsClient;
}

router.get("/api/analytics/data", async (_req, res, next) => {
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

    // Map safely with optional chaining & defaults
    const data: AnalyticsRow[] = rows.map((r) => ({
      pagePath: r.dimensionValues?.[0]?.value ?? "",
      pageTitle: r.dimensionValues?.[1]?.value ?? "",
      deviceCategory: r.dimensionValues?.[2]?.value ?? "",
      activeUsers: Number(r.metricValues?.[0]?.value) || 0,
      newUsers: Number(r.metricValues?.[1]?.value) || 0,
      screenPageViews: Number(r.metricValues?.[2]?.value) || 0,
    }));

    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
