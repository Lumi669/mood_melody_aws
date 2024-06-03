import express, { Request, Response } from "express";
import { Sequelize, DataTypes } from "sequelize";
import cors from "cors";
import bodyParser from "body-parser";

import serverless from "serverless-http";

import fs from "fs";
import path from "path";

// Determine if running in Lambda environment
const isLambda = !!process.env.LAMBDA_TASK_ROOT;

// Define the database URL based on the environment
const localDatabasePath = "./moodmelodydatabase.db";
const lambdaDatabasePath = "/tmp/moodmelodydatabase.db";
const databaseUrl: string =
  process.env.DATABASE_URL ||
  `sqlite:${isLambda ? lambdaDatabasePath : localDatabasePath}`;

// If running in Lambda, copy the database to the /tmp directory
if (isLambda) {
  const sourceFilePath = path.join(__dirname, "moodmelodydatabase.db");
  const destFilePath = lambdaDatabasePath;

  if (!fs.existsSync(sourceFilePath)) {
    throw new Error(`Source database file not found: ${sourceFilePath}`);
  }

  fs.copyFileSync(sourceFilePath, destFilePath);
}

// Initialize Sequelize
const sequelize = new Sequelize(databaseUrl, {
  dialect: databaseUrl.startsWith("postgres") ? "postgres" : "sqlite",
  logging: false,
  dialectOptions: databaseUrl.startsWith("postgres")
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Models
interface MusicAttributes {
  name: string;
  mood: string;
  url: string;
  ctg: string;
}

const Music = sequelize.define(
  "Music",
  {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    mood: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, unique: true, allowNull: false },
    ctg: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  { tableName: "music" },
);

interface ImageAttributes {
  name: string;
  mood: string;
  url: string;
  ctg: string;
}

const Image = sequelize.define(
  "Image",
  {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    mood: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, unique: true, allowNull: false },
    ctg: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  { tableName: "images" },
);

// Synchronize all models with the database
sequelize.sync();

// Routes
app.get("/test", (req: Request, res: Response) => {
  res.json({
    message: "The server is running ooo..hhhiip??==.",
  });
});

app.post("/api/musics", async (req, res) => {
  try {
    const newMusics = await Music.bulkCreate(req.body, { validate: true });
    res.status(201).json(newMusics);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating music", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
});

app.get("/api/musics", async (req, res) => {
  try {
    const musics = await Music.findAll();
    res.status(200).json(musics);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error retrieving music", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
});

app.delete("/api/musics", async (req, res) => {
  try {
    await Music.destroy({ where: {} });
    res.status(200).json({ message: "All data deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error deleting music", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
});

app.post("/api/images", async (req, res) => {
  try {
    const newImages = await Image.bulkCreate(req.body, { validate: true });
    console.log("newImage from post === ", newImages);
    res.status(201).json(newImages);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error creating image", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
});

app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error retrieving image", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
});

app.delete("/api/images", async (req, res) => {
  try {
    await Image.destroy({ where: {} });
    res.status(200).json({ message: "All data deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error deleting image", error: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
});

// Additional routes...

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Music Mood API!" });
});

// Start server
const port: number | string = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

export const handler = serverless(app);
