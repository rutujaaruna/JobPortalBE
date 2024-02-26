import { Router } from 'express';
import userController from '../controllers/user.controller';
import { verifyJWT } from '../utils/auth.util';

const router = Router();

router.get('/getProfileData', verifyJWT, userController.getProfileData);

router.post('/saveUserDetails', verifyJWT, userController.saveBasicDetails);

router.post('/saveEducationalDetails', verifyJWT, userController.saveEducationDetails);

router.post('/saveWorkExperienceDetails', verifyJWT, userController.saveWorkExpDetails);

router.get('/getProfileDetails', verifyJWT, userController.getProfileDetails);

export default router;