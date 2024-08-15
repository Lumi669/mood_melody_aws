import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";

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
  const sourceFilePath = path.join(__dirname, "../../moodmelodydatabase.db");
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

export default sequelize;
