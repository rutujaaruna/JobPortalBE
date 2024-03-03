import { Router } from 'express';
import userController from '../controllers/user.controller';
import { verifyJWT } from '../utils/auth.util';
import { uploadDoc } from '../middlewares/multer.middleware';

const router = Router();

router.get('/getProfileData', verifyJWT, userController.getProfileData);

router.post('/saveUserDetails', verifyJWT, userController.saveBasicDetails);

router.post('/saveEducationalDetails', verifyJWT, userController.saveEducationDetails);

router.post('/saveWorkExperienceDetails', verifyJWT, userController.saveWorkExpDetails);

router.get('/getProfileDetails', verifyJWT, userController.getProfileDetails);

router.post('/uploadPic', verifyJWT, uploadDoc.single('file'), userController.uploadProfilePic);

export default router;