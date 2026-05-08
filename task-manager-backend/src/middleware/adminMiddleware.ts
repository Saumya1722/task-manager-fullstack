import { Response, NextFunction } from "express";

export const adminMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      message: "Access denied. Admin only."
    });

  }

  next();
};