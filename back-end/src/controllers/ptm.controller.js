import {
  createPTMService,
  getStudentPTMService,
  getParentPTMService,
  getTeacherPTMService,
  createPtmForAllStudentsService,
} from "../services/ptm.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";

/**
 * Create PTM
 * POST /api/ptm
 */
export const createPTM = async (req, res) => {
  try {
    const { studentId, teacherId, date, time } = req.body;

    if (!studentId || !teacherId || !date || !time) {
      return errorResponse(
        res,
        "All fields are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const ptm = await createPTMService({
      studentId,
      teacherId,
      date,
      time,
    });

    return successResponse(
      res,
      "PTM scheduled successfully",
      ptm,
      HTTP_STATUS.CREATED
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
 * Student views PTM
 */
export const getStudentPTMs = async (req, res) => {
  try {
    const data = await getStudentPTMService(req.user.id);

    return successResponse(res, "PTMs fetched", data);
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Parent views PTM
 */
export const getParentPTMs = async (req, res) => {
  try {
    const data = await getParentPTMService(req.user.id);

    return successResponse(res, "PTMs fetched", data);
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Teacher views PTM
 */
export const getTeacherPTMs = async (req, res) => {
  try {
    const data = await getTeacherPTMService(req.user.id);

    return successResponse(res, "PTMs fetched", data);
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};


/**
 * Create PTM for all students of a class & section
 * POST /api/ptm/class
 * Admin / Teacher
 */
export const createPTMForClass = async (req, res) => {
  try {
    const { teacherId, className, section, date, time } = req.body;

    if (!teacherId || !className || !section || !date || !time) {
      return errorResponse(
        res,
        "All fields are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const result = await createPtmForAllStudentsService({
      teacherId,
      className,
      section,
      date,
      time,
    });

    return successResponse(
      res,
      "PTM scheduled successfully for class",
      result,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
