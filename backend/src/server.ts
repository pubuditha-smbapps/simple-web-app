import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
// import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.listen(5001, () => {
  console.log("Server is running on port: 5001");
});
