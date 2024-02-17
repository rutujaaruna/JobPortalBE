import { NextFunction, Request, Response } from "express";
import userRepository from "../services/user.service";

class UserController {
  async getProfileData(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.query.userId as string, 10);
      console.log("userI", userId);
      const profileData = await userRepository.getProfileData(userId as number);
      console.log("profileData", profileData);
      return res.json({
        data: profileData,
        status: 200,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
