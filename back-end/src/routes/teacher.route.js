import express from "express";
import {
  getTeacherProfile,
  getTeacherClasses,
  getTeacherClassAttendanceSummary,
  getTeacherTodayClasses,
} from "../controllers/teacher.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

/**
 * @access TEACHER
 */

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher APIs
 */

/**
 * @swagger
 * /api/teacher/classes:
 *   get:
 *     summary: Get teacher assigned classes
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teacher classes
 */

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getTeacherProfile
);

router.get(
  "/classes",
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getTeacherClasses
);

router.get(
  "/attendance-summary",
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getTeacherClassAttendanceSummary
);

router.get(
  "/today",
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getTeacherTodayClasses
);

export default router;
