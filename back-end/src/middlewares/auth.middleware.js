import { verifyToken } from "../config/jwt.js";
import { errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constants.js";

export const authMiddleware = async (req, res, next) => {
    try{
        const authHeader= req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return errorResponse(
                res, 
                "Authorization token is missing or invalid",
                HTTP_STATUS.UNAUTHORIZED
            );
        }
        const token = authHeader.split("")[1];
        const decoded = verifyToken(token);
        req.user = {
            id: decoded.id,
            role: decoded.role,
        }
        next();
    }catch(error){
        return errorResponse(
            res, 
            "Unauthorized", 
            HTTP_STATUS.UNAUTHORIZED, 
            error.message
        );
    }
}