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

export default router;