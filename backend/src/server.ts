import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";
import authRoutes from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
