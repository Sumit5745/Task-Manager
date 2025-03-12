import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface userAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "member";
}

export class User extends Model<userAttributes> implements userAttributes {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: "admin" | "member";
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("admin", "member"),
      defaultValue: "member",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);
