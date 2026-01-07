import express from "express";
import { getSubjects } from "../controllers/subject.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

router.get(
  "/all",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  getSubjects
);

export default router;
