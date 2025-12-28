import { verifyToken } from "../config/jwt.js";
import { errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";

export const authMiddleware = async (req, res, next) => {
    const token= req.cookies?.token;

    if(!token){
        return errorResponse(
            res,
            "Authorization token is missing",
            HTTP_STATUS.UNAUTHORIZED
        );
    }
    try{

        const decoded = verifyToken(token);

        req.user = {
        id: decoded.id,
        role: decoded.role,
        };

        next();
    }catch(error){
        return errorResponse(
            res, 
            "Invalid or expired token", 
            HTTP_STATUS.UNAUTHORIZED, 
            error.message
        );
    }
}