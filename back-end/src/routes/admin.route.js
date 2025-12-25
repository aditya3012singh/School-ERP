import express from "express";
import { addParentToStudent, createAdmin, createStudent, createTeacher, getAdminDashboardStats, inviteParent } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

/**
 * @route   POST /api/admin/teachers
 * @desc    Admin creates teacher
 * @access  ADMIN
 */
router.post(
  "/teachers",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  createTeacher
);

router.post(
  "/students",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  createStudent
);

router.post(
  "/students/:studentId/parents",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  addParentToStudent
);

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  createAdmin
);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin APIs
 */

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats fetched
 */

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getAdminDashboardStats
);

router.post(
  "/invite-parent",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  inviteParent
);


export default router;
