import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import serverless from "serverless-http";

import testRoutes from "./routes/testRoutes";
import imageRoutes from "./routes/imageRoutes";
import musicRoutes from "./routes/musicRoutes";
import rootRoutes from "./routes/rtRoutes";
import sentimentRoutes from "./routes/sentimentRoutes";
import saveUserFeedBack from "./routes/saveUserFeedback";
import analyticsRoutes from "./routes/analyticsRoutes";

import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(
  cors({
    origin: "*", // Or specify the frontend domain for more security
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(bodyParser.json());

// Middleware to parse JSON bodies
app.use(express.json());

// Register routes for images
app.use("/api/images", imageRoutes);

app.use("/api/musics", musicRoutes);

app.use("/", rootRoutes);

app.use("/test", testRoutes);

app.use("/api/sentimentanalysis", sentimentRoutes);
app.use("/api/saveuserfeedback", saveUserFeedBack);

app.use("/api/analytics", analyticsRoutes);

// Register the error handler as the last middleware
app.use(errorHandler);

// If using serverless:
export const handler = serverless(app);

// If running locally, start the server (this block should not be used in a serverless environment)
if (!process.env.LAMBDA_TASK_ROOT) {
  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`),
  );
}
