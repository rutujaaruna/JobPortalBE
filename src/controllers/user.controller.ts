import { NextFunction, Request, Response } from 'express';
import UserRepository from '../services/user.service';
import { WorkExpDetails, userBasicSchema, userEduDetails, userPersonalSchema } from '../utils/joi.util';

export default class UserController {

  static getProfileData = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.query.userId as string, 10);
      console.log('userI', userId);
      const profileData = await UserRepository.getProfileData(userId as number);
      console.log('profileData', profileData);
      return res.json({
        data: profileData,
        status: 200,
      });
    } catch (err) {
      next(err);
    }
  };

  static saveBasicDetails = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body; // Parse the JSON data from the request body.
      const userId = parseInt(req.query.userId as string, 10);
      userData.user = req.query.userId;
      userData.profileVisit = true;

      const { firstName, lastName, middleName, email, dateOfBirth, gender, profileVisit, ...personalInfo } = userData;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { location, address, mobileNo, bloodGroup, relationshipStatus, nationality, user } = personalInfo;

      // Object containing personal information
      const userObject = { firstName, lastName, middleName, dateOfBirth, gender, email, profileVisit };

      const userResult = await userBasicSchema.validateAsync(userObject);

      const userDetailsResult = await userPersonalSchema.validateAsync(personalInfo);

      await UserRepository.saveUserDetails(userResult);

      const userExist = await UserRepository.getPersonalData(userId);

      if (userExist !== null && userExist !== undefined) {
        await UserRepository.updatePersonalDetails(userDetailsResult, userId);
      } else {
        await UserRepository.savePersonalDetails(userDetailsResult);
      }

      return res.json({ status:200, message:'Data saved successfully' });
    } catch (err) {
      next(err);
    }

  };

  static saveEducationDetails = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body; // Parse the JSON data from the request body.
      const userId = parseInt(req.query.userId as string, 10);
      userData.user = req.query.userId;
      const eduId = parseInt(req.query?.eduId as string, 10);

      const result = await userEduDetails.validateAsync(userData);

      if (eduId) {
        await UserRepository.updateEduDetails(result, userId, eduId);
      } else {
        await UserRepository.saveEduDetails(result);
      }

      return res.json({ status:200, message:'Data saved successfully' });

    } catch (err) {
      next(err);
    }
  };

  static saveWorkExpDetails = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body; // Parse the JSON data from the request body.
      const userId = parseInt(req.query.userId as string, 10);
      userData.user = req.query.userId;
      const workId = parseInt(req.query?.workId as string, 10);
      console.log('userData', userData);


      const result = await WorkExpDetails.validateAsync(userData);

      if (workId) {
        await UserRepository.updateWorkExpDetails(result, userId, workId);
      } else {
        await UserRepository.saveWorkExpDetails(result);
      }

      return res.json({ status:200, message:'Data saved successfully' });

    } catch (err) {
      next(err);
    }
  };

  static getProfileDetails = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.query.userId as string, 10);
      const getUserData = await UserRepository.getProfileDetails(userId);
      return res.json({ status:200, data:getUserData });
    } catch (err) {
      next(err);
    }
  };

  static uploadProfilePic = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.query.userId as string, 10);
      const fileName = req.body.newFileName;

      await UserRepository.uploadProfilePic(userId, fileName);

      return res.json({ status:200, message:'Image uploaded successfully' });


    } catch (err) {
      next(err);
    }

  };
}
