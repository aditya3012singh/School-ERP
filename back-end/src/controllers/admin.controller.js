import { addParentToStudentService, createAdminService, createStudentService, createTeacherService, getAdminDashboardStatsService, inviteParentService } from "../services/admin.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";

/**
 * Create Teacher Controller
 * POST /api/admin/teachers
 */
export const createTeacher = async (req, res) => {
  try {
    const { name, email, password, subject } = req.body;

    if (!name || !email || !password || !subject) {
      return errorResponse(
        res,
        "All fields are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const teacher = await createTeacherService({
      name,
      email,
      password,
      subject,
    });

    return successResponse(
      res,
      "Teacher created successfully",
      teacher,
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


export const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rollNo,
      className,
      section,
      dob,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !rollNo ||
      !className ||
      !section ||
      !dob ||
      !address
    ) {
      return errorResponse(
        res,
        "All fields are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const student = await createStudentService({
      name,
      email,
      password,
      rollNo,
      className,
      section,
      dob,
      address,
    });

    return successResponse(
      res,
      "Student created successfully",
      student,
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



export const addParentToStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { name, email, password, contact, relation } = req.body;

    if (!name || !email || !password || !contact || !relation) {
      return errorResponse(
        res,
        "All fields are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const parent = await addParentToStudentService({
      studentId,
      name,
      email,
      password,
      contact,
      relation,
    });

    return successResponse(
      res,
      "Parent added successfully",
      parent,
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


export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return errorResponse(
        res,
        "Email and password are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const admin = await createAdminService({ name, email, password });

    return successResponse(
      res,
      "Admin created successfully",
      admin,
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


export const getAdminDashboardStats = async (req, res) => {
  try {
    const stats = await getAdminDashboardStatsService();

    return successResponse(
      res,
      "Dashboard stats fetched successfully",
      stats,
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


export const inviteParent = async (req, res) => {
  const { email, studentId } = req.body;
  await inviteParentService(email, studentId);
  return successResponse(res, "Invitation sent");
};
