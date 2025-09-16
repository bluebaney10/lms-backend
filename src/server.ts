import dotenv from "dotenv";
import express from "express";
import router from "./routes/router";
import connectDB from "./db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

connectDB();

const port = process.env.PORT || 3000;

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Tutorial");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
