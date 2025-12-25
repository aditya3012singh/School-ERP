import { successResponse, errorResponse } from "../utils/response.js"; 
import { HTTP_STATUS } from "../utils/constants.js";
import { getParentStudentAttendanceService, getStudentAttendanceService, markAttendanceService } from "../services/attendance.service.js";

export const markAttendance = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { subjectId, date, records } = req.body;

    if (!subjectId || !date || !Array.isArray(records)) {
      return errorResponse(
        res,
        "subjectId, date and records are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    if (records.length === 0) {
      return errorResponse(
        res,
        "Attendance records cannot be empty",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const result = await markAttendanceService({
      teacherId,
      subjectId,
      date,
      records,
    });

    return successResponse(
      res,
      "Attendance marked successfully",
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


export const getStudentAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subjectId } = req.query;

    const data = await getStudentAttendanceService(
      userId,
      subjectId
    );

    return successResponse(
      res,
      "Attendance fetched successfully",
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


export const getParentStudentAttendance = async (req, res) => {
  try {
    const parentUserId = req.user.id;
    const { subjectId } = req.query;

    const data = await getParentStudentAttendanceService(
      parentUserId,
      subjectId
    );

    return successResponse(
      res,
      "Attendance fetched successfully",
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