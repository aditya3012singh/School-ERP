import { acceptParentInviteService, forgotPasswordService, loginService, resetPasswordService } from "../services/auth.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";
import prisma from "../config/prisma.js";

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
        const { token, user } = await loginService(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: "/",
        });
        return successResponse(
            res, 
            "Login successful", 
            { user },
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


export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


export const me = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return errorResponse(
        res,
        "User not found",
        HTTP_STATUS.NOT_FOUND
      );
    }

    return successResponse(
      res,
      "User fetched successfully",
      { user },
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Failed to fetch user",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};