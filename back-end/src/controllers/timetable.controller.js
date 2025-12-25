import { createTimetableService, getStudentTimetableService, getTeacherTimetableService } from "../services/timetable.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";

/**
 * Create Timetable Controller
 * POST /api/admin/timetable
 */
export const createTimetable = async (req, res) => {
  try {
    const {
      className,
      section,
      day,
      startTime,
      endTime,
      subjectId,
      teacherId,
    } = req.body;

    if (
      !className ||
      !section ||
      !day ||
      !startTime ||
      !endTime ||
      !subjectId ||
      !teacherId
    ) {
      return errorResponse(
        res,
        "All fields are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const timetable = await createTimetableService({
      className,
      section,
      day,
      startTime,
      endTime,
      subjectId,
      teacherId,
    });

    return successResponse(
      res,
      "Timetable created successfully",
      timetable,
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


export const getStudentTimetable = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await getStudentTimetableService(userId);

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


export const getTeacherTimetable = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await getTeacherTimetableService(userId);

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