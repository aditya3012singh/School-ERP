import express from "express";
import {
  getStudentProfile,
  getStudentParents,
  getStudentPTMs,
  getStudentTimetable,
  getAllStudent,
} from "../controllers/student.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

/**
 * @route   GET /api/student/profile
 * @desc    Get logged-in student's profile
 * @access  STUDENT
 */

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student APIs
 */

/**
 * @swagger
 * /api/student/profile:
 *   get:
 *     summary: Get logged-in student profile
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student profile
 */

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentProfile
);

/**
 * @route   GET /api/student/parents
 * @desc    Get student's parents
 * @access  STUDENT
 */
router.get(
  "/parents",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentParents
);

/**
 * @route   GET /api/student/ptms
 * @desc    Get student's PTMs
 * @access  STUDENT
 */
router.get(
  "/ptms",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentPTMs
);

/**
 * @route   GET /api/student/timetable
 * @desc    Get student's timetable
 * @access  STUDENT
 */
router.get(
  "/timetable",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentTimetable
);

router.get(
  '/allstudents',
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getAllStudent
);

export default router;
