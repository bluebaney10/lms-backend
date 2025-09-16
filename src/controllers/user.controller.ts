import type { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character"
    ),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const userController = {
  async register(req: Request, res: Response) {
    try {
      const parseResult = registerSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json(parseResult.error.format());
        return;
      }

      const { email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ msg: "User already exists" });

      const hashed = await bcrypt.hash(password, 10);

      const user = new User({ email, password: hashed });
      await user.save();

      res.json({ msg: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const parseResult = loginSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json(parseResult.error.format());
        return;
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password as string);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err });
    }
  },
};
