import {
  getParentProfileService,
  getParentChildAttendanceService,
  getParentChildTimetableService,
  getParentChildPTMsService,
  updateParentProfileService,
} from "../services/parent.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";

/**
 * Get parent profile
 * GET /api/parent/profile
 */
export const getParentProfile = async (req, res) => {
  try {
    const data = await getParentProfileService(req.user.id);

    return successResponse(
      res,
      "Parent profile fetched successfully",
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
 * Get child attendance
 * GET /api/parent/attendance
 */
export const getParentChildAttendance = async (req, res) => {
  try {
    const data = await getParentChildAttendanceService(req.user.id);

    return successResponse(
      res,
      "Child attendance fetched successfully",
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
 * Get child timetable
 * GET /api/parent/timetable
 */
export const getParentChildTimetable = async (req, res) => {
  try {
    const data = await getParentChildTimetableService(req.user.id);

    return successResponse(
      res,
      "Child timetable fetched successfully",
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
 * Get child PTMs
 * GET /api/parent/ptms
 */
export const getParentChildPTMs = async (req, res) => {
  try {
    const data = await getParentChildPTMsService(req.user.id);

    return successResponse(
      res,
      "Child PTMs fetched successfully",
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


export const updateParentProfile = async (req, res) => {
  const updated = await updateParentProfileService(req.user.id, req.body);
  return successResponse(res, "Profile updated", updated);
};
