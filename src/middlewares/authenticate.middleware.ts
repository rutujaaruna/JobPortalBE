import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from '../types/auth.type';
import jwt from 'jsonwebtoken';

// Verify a JWT from the request header and set email and token in the request query
export const verifyJWT = (req: Request, res: Response, next:NextFunction) => {
  try {
    if (req.headers.authorization) {

      const token = req.headers.authorization.split(' ')[1]; // Remove the "Bearer" prefix
      if (!token) {
        return res.json({ status:401, message:'unauthorized' });
      }
      const decoded: DecodedToken = jwt.verify(token, process.env.JWT_SECRET || 'jwtsecrettoken') as DecodedToken;
      req.query.email = decoded.id.email;
      req.query.userId = String(decoded.id.id);
      req.query.token = token;
      next();
    }
  } catch (error) {
    next(error);
  }
};