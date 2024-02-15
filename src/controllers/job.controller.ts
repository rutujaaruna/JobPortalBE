import { NextFunction, Request, Response } from 'express';
import { postJobSchema } from '../utils/joi.util';
import JobRepository from '../services/job.service';

export default class JobController {

  // This function handles the creation of a job using data from the request.
  static postJob = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const jobData = req.body; // Parse the JSON data from the request body.

      jobData.user = req.query.userId;

      // Validate the job data against a predefined schema.
      const result = await postJobSchema.validateAsync(jobData);

      const postJob = await JobRepository.createJob(result);

      // If an error occurs during creating a Job, return a 500 error.
      if (!postJob) return res.json({ status:500, message : 'Error occurred while Creating a job' });

      return res.json({ status: 200, message:'Success' }); //success response
    } catch (error) {
      next(error);
    }
  };
}