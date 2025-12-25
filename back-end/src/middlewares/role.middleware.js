import { ROLES, HTTP_STATUS } from "../utils/constants.js";
import { errorResponse } from "../utils/response.js";

export const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role){
            return errorResponse(
                res,
                "User role is missing",
                HTTP_STATUS.FORBIDDEN
            );
        }
        if(!allowedRoles.includes(req.user.role)){
            return errorResponse(
                res,
                "Access forbidden: insufficient permissions",
                HTTP_STATUS.FORBIDDEN
            );
        }
        next();
    }
}