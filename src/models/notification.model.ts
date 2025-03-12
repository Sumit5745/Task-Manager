import { DataTypes, Model } from "sequelize";
import { User } from "./user.model";
import { sequelize } from "../config/database";

export interface notificationAttributes {
  id?: number;
  userId: number;
  message: string;
  isRead?: boolean;
}

export class Notification
  extends Model<notificationAttributes>
  implements notificationAttributes
{
  id!: number;
  userId!: number;
  message!: string;
  isRead!: boolean;
}

Notification.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    message: { type: DataTypes.STRING, allowNull: false },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: "notifications",
    timestamps: true,
  }
);

User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });
