import path from "path";
import fs from "fs";
import Database from "better-sqlite3";

const isLambda = !!process.env.LAMBDA_TASK_ROOT;

const localDatabasePath = "./moodmelodydatabase.db";
const lambdaDatabasePath = "/tmp/moodmelodydatabase.db";
const sourceFilePath = path.join("/var/task", "moodmelodydatabase.db");

if (isLambda) {
  if (!fs.existsSync(sourceFilePath)) {
    console.error(`Source database file not found: ${sourceFilePath}`);
    throw new Error(`Source database file not found: ${sourceFilePath}`);
  }
  fs.copyFileSync(sourceFilePath, lambdaDatabasePath);
  console.log(`Database file copied to: ${lambdaDatabasePath}`);
}

const dbPath = isLambda ? lambdaDatabasePath : localDatabasePath;

console.log("🧠 Using SQLite DB file at:", path.resolve(dbPath));

const db = new Database(dbPath);

// Re-create tables if not exist
db.exec(`
  CREATE TABLE IF NOT EXISTS music (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    mood TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    ctg TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    mood TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    ctg TEXT NOT NULL UNIQUE
  );
`);

export default db;
