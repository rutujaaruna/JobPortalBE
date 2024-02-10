import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

/** Initializing Router */
const router = Router();

router.post('/login', AuthController.login);


export default router;
