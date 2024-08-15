import { DataTypes } from "sequelize";
import sequelize from "../config/database";

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

export default Music;
