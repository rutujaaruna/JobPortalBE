import { Router } from 'express';
import JobController from '../controllers/job.controller';
import { verifyJWT } from '../middlewares/authenticate.middleware';
import { uploadDoc } from '../middlewares/multer.middleware';

const router = Router();

/**
 * @author : Karthik Ganesan
 * @description : Route for posting a job with Resume file upload.
 * @method : POST
 * @endpoint : /api/jobs/postJob
 */
router.post('/postJob', verifyJWT, JobController.postJob);

/**
 * @author : Karthik Ganesan
 * @description : Route for getting job details alumni side.
 * @method : GET
 * @endpoint : /api/jobs/getJob
 * @middleware : verifyJWT
 */
router.get('/getJob', verifyJWT, JobController.getJob);

/**
 * @author : Karthik Ganesan
 * @description : Route for getting user applied job details status.
 * @method : GET
 * @endpoint : /api/jobs/getUserAppliedJob
 * @middleware : verifyJWT
 */
router.get('/getUserAppliedJob', verifyJWT, JobController.getUserAppliedJob);


/**
 * @author : Karthik Ganesan
 * @description : Route for Get Alumni Applied Job Data.
 * @method : GET
 * @endpoint : /api/jobs/getAlumniAppliedJob
 * @middleware : verifyJWT
 */
router.get('/getAlumniAppliedJob', verifyJWT, JobController.getAlumniAppliedJobData);

/**
 * @author : Karthik Ganesan
 * @description : Route for getting user job details.
 * @method : GET
 * @endpoint : /api/jobs/getUserJob
 * @middleware : verifyJWT
 */
router.get('/getUserJob', verifyJWT, JobController.getUserJob);

/**
 * @author : Karthik Ganesan
 * @description : Route for update Status Applied Job of Applicants.
 * @method : POST
 * @endpoint : /api/jobs/updateStatus
 * @middleware : verifyJWT
 */
router.post('/updateStatus', verifyJWT, JobController.updateApplicationStatus);

/**
 * @author : Karthik Ganesan
 * @description : Route for getting applied job data.
 * @method : GET
 * @endpoint : /api/jobs/getAppliedJobData
 * @middleware : verifyJWT
 */
router.get('/getAppliedJobData', verifyJWT, JobController.getAppliedJobData);

/**
 * @author : Karthik Ganesan
 * @description : Route for getting job seeker details.
 * @method : GET
 * @endpoint : /api/jobs/getJobSeeker
 * @middleware : verifyJWT
 */
router.get('/getJobSeeker', verifyJWT, JobController.getJobSeeker);


/**
 * @author : Karthik Ganesan
 * @description : Route for posting a Resume with file upload.
 * @method : POST
 * @endpoint : /api/jobs/postResume
 * @middleware :  uploadDoc.single('file'),verifyJWT
 */
router.post('/postResume', verifyJWT, uploadDoc.single('file'), JobController.postResume);


/**
 * @author : Karthik Ganesan
 * @description : Route for Delete the Resume File.
 * @method : DELETE
 * @endpoint : /api/jobs/deleteResumeFile
 * @middleware : verifyJWT
 */
router.delete('/deleteResumeFile', verifyJWT, JobController.deleteResumeFile);

/**
 * @author : Karthik Ganesan
 * @description : Route for getting user and friend resume details.
 * @method : GET
 * @endpoint : /api/jobs/getResume
 * @middleware : verifyJWT
 */
router.get('/getResume', verifyJWT, JobController.getResumeData);


export default router;