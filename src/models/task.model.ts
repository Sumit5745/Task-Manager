import { DataTypes, Model } from "sequelize";
import { User } from "./user.model";
import { sequelize } from "../config/database";

export interface taskAttributes {
  id?: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  userId: number;
}

export class Task extends Model<taskAttributes> implements taskAttributes {
  id?: number;
  title!: string;
  description!: string;
  status!: "pending" | "in-progress" | "completed";
  userId!: number;
}

Task.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      defaultValue: "pending",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: true,
  }
);

User.hasMany(Task, { foreignKey: "userId", as: "tasks" });
Task.belongsTo(User, { foreignKey: "userId", as: "user" });
