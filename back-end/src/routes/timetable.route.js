import express from "express";
import { createTimetable, getStudentTimetable, getTeacherTimetable } from "../controllers/timetable.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

/**
 * @route   POST /api/admin/timetable
 * @desc    Admin creates timetable
 * @access  ADMIN
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  createTimetable
);

router.get(
  "/student",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentTimetable
);

router.get(
  "/teacher",
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getTeacherTimetable
);

export default router;
