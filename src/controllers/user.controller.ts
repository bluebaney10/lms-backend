import type { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ msg: "User already exists" });

      const hashed = await bcrypt.hash(password, 10);

      const user = new User({ name, email, password: hashed });
      await user.save();

      res.json({ msg: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password as string);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

      res.json({
        token,
        user: { name: user.name, id: user._id, email: user.email },
      });
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err });
    }
  },
};
