import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../utils/constants.js";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    
    const options = {
        expiresIn: JWT_CONFIG.EXPIRES_IN,
        algorithm: JWT_CONFIG.ALGORITHM,
    };
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  if(!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};