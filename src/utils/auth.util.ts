import { Request, Response, NextFunction } from "express";
import { DecodedToken } from "../types/auth.type";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

// Generate a JSON Web Token (JWT) with an optional expiration time
export const generateJWT = (id: User, expiresIn?: string) => {
  const expiresInJwt = expiresIn ? expiresIn : "7d";
  const token = jwt.sign({ id }, process.env.JWT_SECRET || "jwtsecrettoken", {
    expiresIn: expiresInJwt,
  });
  return token;
};

// Verify a JWT from the request header and set email and token in the request query
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]; // Remove the "Bearer" prefix
      if (!token) {
        return res.json({ status: 401, message: "unauthorized" });
      }
      const decoded: DecodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET || "jwtsecrettoken"
      ) as DecodedToken;
      req.query.email = decoded.id.email;
      req.query.userId = String(decoded.id.id);
      req.query.token = token;
      next();
    }
  } catch (error) {
    next(error);
  }
};

// Compare a value with a previously hashed value
export const compare = (value: string, compareValue: string) => {
  const matchedValue = bcrypt.compare(value, compareValue);
  return matchedValue;
};

// Hash a value using bcrypt
export const hash = (value: string) => {
  const hashedValue = bcrypt.hash(value, 12);
  return hashedValue;
};
