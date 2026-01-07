import { getAllSubjectsService } from "../services/subject.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";

export const getSubjects = async (_req, res) => {
  try {
    const subjects = await getAllSubjectsService();
    return successResponse(
      res,
      "Subjects fetched successfully",
      subjects,
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
