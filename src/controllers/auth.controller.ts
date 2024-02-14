import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import AuthRepository from "../services/auth.service";
import { compare, generateJWT, hash } from "../utils/auth.util";
import { loginSchema, registerSchema } from "../utils/joi.util";
import { DeleteDateColumn } from "typeorm";

export default class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Validate the request body to ensure it contains a valid email and password.
      const result = await loginSchema.validateAsync(req.body);

      const { email, password } = result;

      const existingUser = await AuthRepository.getUserByEmail(email as string);
      if (!existingUser)
        return res.json({ status: 404, message: "User not found" });

      // Compare the provided password with the user's stored password.
      const passwordMatch = await compare(password, existingUser.password);

      if (!passwordMatch)
        return res.json({
          status: 422,
          message: "email or password is incorrect",
        });

      existingUser.password = "";

      const JWT = generateJWT(existingUser);

      return res.json({
        status: 200,
        message: "Login Done Successfully!",
        data: JWT,
      });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  };

  static register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const registerResult = await registerSchema.validateAsync(req.body);
      const details = req.body;
      const existUser = await AuthRepository.getUserByEmail(details.email);
      if (existUser)
        return res.json({
          status: 400,
          message: "email is already exist",
        });

      delete details.confirmPassword;
      details.password = await hash(details.password);
      const saveRegisterData = await AuthRepository.saveRegisterData(details);
      if (saveRegisterData)
        return res.json({
          status: 200,
          message: "Registered successfully",
          data: saveRegisterData,
        });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  };
}
