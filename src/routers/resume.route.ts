import { Router } from 'express';
import resumeController from '../controllers/resume.controller';
import { verifyJWT } from '../utils/auth.util';

const router = Router();

/**
 * @author : Rutuja Patil
 * @description : Route for generating resume.
 * @method : POST
 * @endpoint : /api/resume/generateResume
 */
router.post('/generateResume', resumeController.generateResume);
router.use(verifyJWT);

export default router;