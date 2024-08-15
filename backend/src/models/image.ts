import { DataTypes } from "sequelize";
import sequelize from "../config/database";

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

export default Image;
