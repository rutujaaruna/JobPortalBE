import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import AuthRepository from '../services/auth.service';
import { compare, generateJWT } from '../utils/auth.util';
import { loginSchema } from '../utils/joi.util';

export default class AuthController {

  static login = async(req:Request, res:Response, next:NextFunction) => {

    try {
      //Validate the request body to ensure it contains a valid email and password.
      const result = await loginSchema.validateAsync(req.body);

      const { email, password } = result;

      const existingUser = await AuthRepository.getUserByEmail(email as string);
      if (!existingUser) return res.json({ status:404, message:'User not found' });

      // Compare the provided password with the user's stored password.
      const passwordMatch = await compare(password, existingUser.password);

      if (!passwordMatch) return res.json({ status:422, message:'email or password is incorrect' });

      existingUser.password = '';

      const JWT = generateJWT(existingUser);

      return res.json({ status:200, message:'Login Done Successfully!', data:JWT });

    } catch (err) {
      logger.error(err);
      next(err);
    }
  };
}