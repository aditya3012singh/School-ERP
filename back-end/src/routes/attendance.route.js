import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../utils/constants.js";
import { getParentStudentAttendance, getStudentAttendance, markAttendance } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  markAttendance
);

router.get(
  "/student",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentAttendance
);

router.get(
  "/parent",
  authMiddleware,
  roleMiddleware(ROLES.PARENT),
  getParentStudentAttendance
);

export default router;