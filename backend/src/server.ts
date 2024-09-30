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

import { errorHandler } from "./middleware/errorHandler";

const app = express();
// app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000", // Specify my frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed methods
  credentials: true, // If I need to handle cookies or authentication
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Middleware to parse JSON bodies
app.use(express.json());

// Register routes for images
app.use("/api/images", imageRoutes);

// Register routes for musics
app.use("/api/musics", musicRoutes);

app.use("/", rootRoutes);

app.use("/test", testRoutes);

app.use("/api/sentimentanalysis", sentimentRoutes);
app.use("/api/saveUserFeedback", saveUserFeedBack);

// Register other routes...
// app.use("/api/other", otherRoutes);

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
