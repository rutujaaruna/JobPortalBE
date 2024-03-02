import { NextFunction, Request, Response } from 'express';
import botRepository from '../services/bot.service';
import { string } from 'joi';

export default class botController {

    public static getBotDataByUserInput = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userInput = req.query.userInput; // Retrieve user_input from request body
            const botData = await botRepository.getBotDataByUserInput(userInput as string);
            if (botData) {
                return res.json({ status: 200, message: 'Success', data: botData });
            } else {
                return res.json({ status: 404, message: 'Bot data not found for the provided user input' });
            }
        } catch (error) {
            next(error);
        }
    };

}
