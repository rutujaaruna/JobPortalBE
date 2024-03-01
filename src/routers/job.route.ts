import { Router } from 'express';
import JobController from '../controllers/job.controller';
import { verifyJWT } from '../middlewares/authenticate.middleware';

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

export default router;