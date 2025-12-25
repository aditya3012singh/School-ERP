import { HTTP_STATUS } from "../utils/constants.js";

export const errorMiddleware = (err, req, res, next) => {   
    console.error(err);
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        error: err.errors || null,
    });
}