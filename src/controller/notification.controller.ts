import { Request, Response } from "express";
import { Notification } from "../models/notification.model";

export const getNotification = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = (req as any).user.user.id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }
    const notification = await Notification.findAll({
      where: { userId, isRead: false },
    });
    return res.status(200).json({
      message: "Notification fetched successfully",
      success: true,
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error" + error,
      success: false,
    });
  }
};

export const markNotificationAsRead = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Notification ID is required",
        success: false,
      });
    }
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
        success: false,
      });
    }
    await notification.update({ isRead: true });
    return res.status(200).json({
      message: "Notification marked as read successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error" + error,
      success: false,
    });
  }
};
