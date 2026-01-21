import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(express.static(path.join(process.cwd(), "../frontend/dist"))); // adjust path if needed

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../frontend/dist/index.html")); // adjust path if needed
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
