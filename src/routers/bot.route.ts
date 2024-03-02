import { Router } from 'express';
import botController from '../controllers/bot.controller'


/** Initializing Router */
const router = Router();

router.get('/getBotDataByUserInput', botController.getBotDataByUserInput);

export default router;