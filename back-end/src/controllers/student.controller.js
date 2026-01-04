import {
  getStudentProfileService,
  getStudentParentsService,
  getStudentPTMsService,
  getStudentTimetableService,
  getAllStudentsService,
  getStudentDashboardService,
} from "../services/student.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";

/**
 * Get logged-in student's profile
 * GET /api/student/profile
 */
export const getStudentProfile = async (req, res) => {
  try {
    const data = await getStudentProfileService(req.user.id);

    return successResponse(
      res,
      "Student profile fetched successfully",
      data,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Get student's parents
 * GET /api/student/parents
 */
export const getStudentParents = async (req, res) => {
  try {
    const data = await getStudentParentsService(req.user.id);

    return successResponse(
      res,
      "Parents fetched successfully",
      data,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Get student's PTMs
 * GET /api/student/ptms
 */
export const getStudentPTMs = async (req, res) => {
  try {
    const data = await getStudentPTMsService(req.user.id);

    return successResponse(
      res,
      "PTMs fetched successfully",
      data,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Get student's timetable
 * GET /api/student/timetable
 */
export const getStudentTimetable = async (req, res) => {
  try {
    const data = await getStudentTimetableService(req.user.id);

    return successResponse(
      res,
      "Timetable fetched successfully",
      data,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

export const getAllStudent = async (req, res) => {
  try{
    const data= await getAllStudentsService();
    return successResponse(
      res,
      "All students fetched successfully",
      data,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

export const getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await getStudentDashboardService(userId);

    return successResponse(
      res,
      "Student dashboard fetched successfully",
      data,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};