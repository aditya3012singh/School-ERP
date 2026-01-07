import express from "express";
import {
  getTeacherProfile,
  getTeacherClasses,
  getTeacherClassAttendanceSummary,
  getTeacherTodayClasses,
  getAllTeacher,
  getTeacherDashboard,
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

router.get(
  "/allteachers",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getAllTeacher
)

/**
 * @swagger
 * /api/teacher/dashboard:
 *   get:
 *     summary: Get teacher dashboard data
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teacher dashboard data
 */
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getTeacherDashboard
);

export default router;
