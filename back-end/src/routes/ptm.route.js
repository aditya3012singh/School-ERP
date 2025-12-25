import express from "express";
import {
  createPTM,
  getStudentPTMs,
  getParentPTMs,
  getTeacherPTMs,
} from "../controllers/ptm.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

/**
 * Create PTM (Admin / Teacher)
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.TEACHER),
  createPTM
);

/**
 * View PTM
 */
router.get(
  "/student",
  authMiddleware,
  roleMiddleware(ROLES.STUDENT),
  getStudentPTMs
);

router.get(
  "/parent",
  authMiddleware,
  roleMiddleware(ROLES.PARENT),
  getParentPTMs
);

router.get(
  "/teacher",
  authMiddleware,
  roleMiddleware(ROLES.TEACHER),
  getTeacherPTMs
);

export default router;
