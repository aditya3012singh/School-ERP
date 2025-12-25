import express from "express";
import {
  getParentProfile,
  getParentChildAttendance,
  getParentChildTimetable,
  getParentChildPTMs,
  updateParentProfile,
} from "../controllers/parent.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

/**
 * @route   GET /api/parent/profile
 * @access  PARENT
 */

/**
 * @swagger
 * tags:
 *   name: Parent
 *   description: Parent APIs
 */

/**
 * @swagger
 * /api/parent/profile:
 *   get:
 *     summary: Get parent profile
 *     tags: [Parent]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Parent profile
 */

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(ROLES.PARENT),
  getParentProfile
);

/**
 * @route   GET /api/parent/attendance
 * @access  PARENT
 */
router.get(
  "/attendance",
  authMiddleware,
  roleMiddleware(ROLES.PARENT),
  getParentChildAttendance
);

/**
 * @route   GET /api/parent/timetable
 * @access  PARENT
 */
router.get(
  "/timetable",
  authMiddleware,
  roleMiddleware(ROLES.PARENT),
  getParentChildTimetable
);

/**
 * @route   GET /api/parent/ptms
 * @access  PARENT
 */
router.get(
  "/ptms",
  authMiddleware,
  roleMiddleware(ROLES.PARENT),
  getParentChildPTMs
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware(ROLES.PARENT),
  updateParentProfile
);


export default router;
