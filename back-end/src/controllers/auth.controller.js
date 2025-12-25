import { acceptParentInviteService, forgotPasswordService, loginService, resetPasswordService } from "../services/auth.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";

export const login= async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return errorResponse(
                res, 
                "Email and password are required", 
                HTTP_STATUS.BAD_REQUEST
            );
        }
        const result = await loginService(email, password);
        return successResponse(
            res, 
            "Login successful", 
            result,
            HTTP_STATUS.OK, 
        );
    }catch(error){
        return errorResponse(
            res, 
            error.message || "Login failed", 
            error.statuscode || HTTP_STATUS.INTERNAL_SERVER_ERROR, 
            error.errors || null
        );
    }
}


export const acceptParentInvite = async (req, res) => {
  const { token, password } = req.body;
  await acceptParentInviteService(token, password);
  return successResponse(res, "Account created successfully");
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(
        res,
        "Email is required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // IMPORTANT: Do not reveal whether email exists
    await forgotPasswordService(email);

    return successResponse(
      res,
      "If this email exists, a reset link has been sent",
      null,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Failed to process request",
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Reset Password Controller
 * POST /api/auth/reset-password
 */
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return errorResponse(
        res,
        "Token and new password are required",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    if (password.length < 6) {
      return errorResponse(
        res,
        "Password must be at least 6 characters long",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await resetPasswordService(token, password);

    return successResponse(
      res,
      "Password reset successfully. You can now log in.",
      null,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Invalid or expired token",
      error.statusCode || HTTP_STATUS.BAD_REQUEST
    );
  }
};