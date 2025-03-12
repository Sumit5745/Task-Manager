import { Request, Response } from "express";
import { Task } from "../models/task.model";
import { io } from "../../server";
import { Notification } from "../models/notification.model";

export const cerateTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, status, userId } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "User Id is not Provided", success: false });
    }
    const task = await Task.create({
      title,
      description,
      status,
      userId,
    });

    const message = `you have been assigned a new task : ${title}`;
    const notification = await Notification.create({ userId, message });

    // socket event
    io.to(`user-${userId}`).emit("newNotification", notification);

    res
      .status(201)
      .json({ message: "Task Created Successfully", success: true, task });
  } catch (error) {
    res.status(500).json({
      message: "Server Error" + error,
      success: false,
    });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Task Id is not Provided", success: false });
    }
    console.log(id);

    const task = await Task.findByPk(id);
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }

    await task.update({ title, description, status });
    io.emit("taskUpdated", task);
    res.status(200).json({
      message: "Task Updated Successfully",
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error" + error,
      success: false,
    });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Task Id is not Provided", success: false });
    }
    const task = await Task.findByPk(id);
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }
    await task.destroy();
    io.emit("taskDeleted", task);
    res.status(200).json({
      message: "Task Deleted Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error" + error,
      success: false,
    });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<any> => {
  try {
    const tasks = await Task.findAll();
    res
      .status(200)
      .json({ message: "Tasks fetched successfully", success: true, tasks });
  } catch (error) {
    res.status(500).json({
      message: "Server Error" + error,
      success: false,
    });
  }
};
