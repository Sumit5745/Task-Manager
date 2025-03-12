import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer") && header.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token not provided", success: false });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY!);
    (req as any).user = decode;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" + error, success: false });
  }
};

export const authorizeRole = (roles: string[]): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user.user;
    if (!roles.includes(user.role.toUpperCase())) {
      return res.status(403).json({
        message: "Access Denied : Insufficient Permissions",
        success: false,
      });
    }
    next();
  };
};
