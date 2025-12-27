import {
  getTeacherProfileService,
  getTeacherClassesService,
  getTeacherClassAttendanceSummaryService,
  getTeacherTodayClassesService,
  getAllTeacherService,
} from "../services/teacher.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";

/**
 * GET /api/teacher/profile
 */
export const getTeacherProfile = async (req, res) => {
  try {
    const data = await getTeacherProfileService(req.user.id);
    return successResponse(
      res,
      "Teacher profile fetched successfully",
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
 * GET /api/teacher/classes
 */
export const getTeacherClasses = async (req, res) => {
  try {
    const data = await getTeacherClassesService(req.user.id);
    return successResponse(
      res,
      "Assigned classes fetched successfully",
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
 * GET /api/teacher/attendance-summary
 */
export const getTeacherClassAttendanceSummary = async (req, res) => {
  try {
    const { className, section } = req.query;

    if (!className || !section) {
      return errorResponse(
        res,
        "className and section are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const data = await getTeacherClassAttendanceSummaryService(
      req.user.id,
      className,
      section
    );

    return successResponse(
      res,
      "Attendance summary fetched successfully",
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
 * GET /api/teacher/today
 */
export const getTeacherTodayClasses = async (req, res) => {
  try {
    const data = await getTeacherTodayClassesService(req.user.id);

    return successResponse(
      res,
      "Today's classes fetched successfully",
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

export const getAllTeacher = async (req, res) => {
  try{
    const data = await getAllTeacherService();
    return successResponse(
      res,
      "All teachers fetched successfully",
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