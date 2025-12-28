import authRoutes from './routes/auth.route.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.middleware.js';
import adminRoutes from "./routes/admin.route.js";
import attendanceRoutes from "./routes/attendance.route.js";
import timetableRoutes from "./routes/timetable.route.js";
import ptmRoutes from "./routes/ptm.route.js";
import studentRoutes from "./routes/student.route.js";
import parentRoutes from "./routes/parent.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../src/docs/swaagger.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();


app.use(cors(
  {origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🚀 School Management Backend is running",
  });
})


app.use('/api/auth', authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/ptm", ptmRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/teacher", teacherRoutes);


app.use(errorMiddleware);

export default app;