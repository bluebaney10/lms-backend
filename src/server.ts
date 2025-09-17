import dotenv from "dotenv";
import express from "express";
import router from "./routes/router";
import connectDB from "./db";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

connectDB();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Server is running ✅"));

app.get("/hello", (req, res) => {
  res.json({ message: "Hello " });
});

export default app;
