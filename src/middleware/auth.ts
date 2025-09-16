import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export interface AuthRequest extends Request {
  user?: { id: string };
}

const checkMiddleware = () => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };
};

export default checkMiddleware;
