import { NextFunction, Request, Response } from 'express';
import { postJobSchema } from '../utils/joi.util';
import JobRepository from '../services/job.service';
import { Job } from '../models/jobs.models';
import moment from 'moment';
import { ApplicationStatus } from '../models/jobApplicants.model';


interface JobDetailsSelf {
  totalCount: number;
  jobData?: Job[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postedJobDetails?: any[];
}

interface JobDetailsOthers {
  total: number;
  jobDetails?: Job[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postedJobDetails?: any[];
}
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

  // This function handles the retrieval of job details based on the provided search criteria.
  static getJob = async(req: Request, res:Response, next: NextFunction) => {
    try {
      const { globalSearch, page } = req.query;
      const limit = 6;
      const offset = (parseInt(page as string, 10) - 1) * limit;
      const userId = parseInt(req.query.userId as string, 10);

      const jobDetails:JobDetailsOthers = await JobRepository.getJobDetails(globalSearch as string, limit as number, offset as number, userId as number);

      const data = jobDetails.jobDetails;
      const postedJobDetails = data?.map((Job) => {
        const createdAt = Job.createdAt;
        const timeAgo = moment(createdAt).fromNow(); // Calculate the time difference
        return {
          ...Job,
          timeAgo,
        };
      });
      delete jobDetails.jobDetails;
      jobDetails.postedJobDetails = postedJobDetails;

      if (jobDetails) return res.json({ status:200, data:jobDetails });

      return res.json({ status:400, message:'An error occurred while getting job details' });

    } catch (error) {
      next(error);
    }
  };

  // This function retrieves job application data for a specific job, both by the user and their friends.
  static getUserAppliedJob = async(req:Request, res: Response, next: NextFunction) => {
    try {
      const { job_id } = req.query;
      const jobId = parseInt(job_id as string, 10);
      const userId = parseInt(req.query.userId as string, 10);

      const getUserAppliedJobByUser = await JobRepository.getUserAppliedData(jobId as number, userId as number);
      if (getUserAppliedJobByUser) return res.json({ status:200, data:getUserAppliedJobByUser });
    } catch (error) {
      next(error);
    }
  };

  //get alumni applied job data with pagination
  static getAlumniAppliedJobData = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.query.userId as string, 10);
      const { searchText, page } = req.query;
      const limit = 6 ;
      const offset = (parseInt(page as string, 10) - 1) * limit;
      const getAlumniJobData = await JobRepository.getAlumniAppliedJob(userId as number, searchText as string, limit as number, offset as number);

      return res.json({ status:200, data:getAlumniJobData });
    } catch (error) {
      next(error);
    }
  };

  // This function handles the retrieval of job details posted by a specific user based on search criteria. self
  static getUserJob = async(req:Request, res:Response, next:NextFunction) => {
    try {
      const { searchText, page } = req.query;
      const limit = 6;
      const offset = (parseInt(page as string, 10) - 1) * limit;
      const userId = parseInt(req.query.userId as string, 10);

      const getPostedJobDetails:JobDetailsSelf = await JobRepository.getJobByUser(searchText as string, limit as number, offset as number, userId as number);
      const data = getPostedJobDetails.jobData;
      const postedJobDetails = data?.map((Job) => {
        const createdAt = Job.createdAt;
        const timeAgo = moment(createdAt).fromNow(); // Calculate the time difference
        return {
          ...Job,
          timeAgo,
        };
      });
      delete getPostedJobDetails.jobData;
      getPostedJobDetails.postedJobDetails = postedJobDetails;
      if (getPostedJobDetails) return res.json({ status:200, data:getPostedJobDetails });

      return res.json({ status:200, message:'An error occurred while getting job details' });
    } catch (error) {
      next(error);
    }
  };

  //updating the status of applicant applied job status.
  static updateApplicationStatus = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, jobApplicantId } = req.body;

      const updateStatus = await JobRepository.updateApplicationStatus(status as ApplicationStatus, jobApplicantId as number);

      return res.json({ status: 200, message: 'successfully Updated!', data:updateStatus });

    } catch (error) {
      next(error);
    }
  };

  // This function handles the retrieval of job data for applied jobs based on search criteria.
  static getAppliedJobData = async(req:Request, res: Response, next: NextFunction) => {
    try {
      const { job_id, page, searchText } = req.query;

      const limit = 6;
      const offset = (parseInt(page as string, 10) - 1) * limit;

      const jobAppliedData = await JobRepository.getJobAppliedData(job_id as string, searchText as string, limit as number, offset as number);

      if (jobAppliedData) return res.json({ status:200, data:jobAppliedData });

    } catch (error) {
      next(error);
    }

  };
}