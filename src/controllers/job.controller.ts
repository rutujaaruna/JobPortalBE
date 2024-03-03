import { NextFunction, Request, Response } from 'express';
import { postJobSchema, postResumeSchema } from '../utils/joi.util';
import JobRepository from '../services/job.service';
import { Job } from '../models/jobs.models';
import moment from 'moment';
import { ApplicationStatus } from '../models/jobApplicants.model';
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';


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
  static postJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobData = req.body; // Parse the JSON data from the request body.
      jobData.user = req.query.userId;

      // Validate the job data against a predefined schema.
      const result = await postJobSchema.validateAsync(jobData);

      const postJob = await JobRepository.createJob(result);

      // If an error occurs during creating a Job, return a 500 error.
      if (!postJob) return res.json({ status: 500, message: 'Error occurred while Creating a job' });

      return res.json({ status: 200, message: 'Success' }); //success response
    } catch (error) {
      next(error);
    }
  };

  // This function handles the retrieval of job details based on the provided search criteria.
  static getJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { globalSearch, page } = req.query;
      const limit = 6;
      const offset = (parseInt(page as string, 10) - 1) * limit;
      const userId = parseInt(req.query.userId as string, 10);

      const jobDetails: JobDetailsOthers = await JobRepository.getJobDetails(globalSearch as string, limit as number, offset as number, userId as number);

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

      if (jobDetails) return res.json({ status: 200, data: jobDetails });

      return res.json({ status: 400, message: 'An error occurred while getting job details' });

    } catch (error) {
      next(error);
    }
  };

  // This function retrieves job application data for a specific job, both by the user and their friends.
  static getUserAppliedJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { job_id } = req.query;
      const jobId = parseInt(job_id as string, 10);
      const userId = parseInt(req.query.userId as string, 10);

      const getUserAppliedJobByUser = await JobRepository.getUserAppliedData(jobId as number, userId as number);
      if (getUserAppliedJobByUser) return res.json({ status: 200, data: getUserAppliedJobByUser });
    } catch (error) {
      next(error);
    }
  };

  //get alumni applied job data with pagination
  static getAlumniAppliedJobData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.query.userId as string, 10);
      const { searchText, page } = req.query;
      const limit = 6;
      const offset = (parseInt(page as string, 10) - 1) * limit;
      const getAlumniJobData = await JobRepository.getAlumniAppliedJob(userId as number, searchText as string, limit as number, offset as number);

      return res.json({ status: 200, data: getAlumniJobData });
    } catch (error) {
      next(error);
    }
  };

  // This function handles the retrieval of job details posted by a specific user based on search criteria. self
  static getUserJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { searchText, page } = req.query;
      const limit = 6;
      const offset = (parseInt(page as string, 10) - 1) * limit;
      const userId = parseInt(req.query.userId as string, 10);

      const getPostedJobDetails: JobDetailsSelf = await JobRepository.getJobByUser(searchText as string, limit as number, offset as number, userId as number);
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
      if (getPostedJobDetails) return res.json({ status: 200, data: getPostedJobDetails });

      return res.json({ status: 200, message: 'An error occurred while getting job details' });
    } catch (error) {
      next(error);
    }
  };

  //updating the status of applicant applied job status.
  static updateApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status, jobApplicantId } = req.body;

      const updateStatus = await JobRepository.updateApplicationStatus(status as ApplicationStatus, jobApplicantId as number);

      return res.json({ status: 200, message: 'successfully Updated!', data: updateStatus });

    } catch (error) {
      next(error);
    }
  };

  // This function handles the retrieval of job data for applied jobs based on search criteria.
  static getAppliedJobData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { job_id, page, searchText } = req.query;

      const limit = 6;
      const offset = (parseInt(page as string, 10) - 1) * limit;

      const jobAppliedData = await JobRepository.getJobAppliedData(job_id as string, searchText as string, limit as number, offset as number);

      if (jobAppliedData) return res.json({ status: 200, data: jobAppliedData });

    } catch (error) {
      next(error);
    }

  };

  // This function handles the retrieval of job seeker details based on search criteria.
  static getJobSeeker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { searchText, page } = req.query;
      const limit = 6;
      const offset = (parseInt(page as string, 10) - 1) * limit;
      const userId = parseInt(req.query.userId as string, 10);
      const jobSeekerDetails = await JobRepository.getJobSeekerData(searchText as string, limit as number, offset as number, userId as number);

      if (jobSeekerDetails) return res.json({ status: 200, data: jobSeekerDetails });
      return res.json({ status: 400, message: 'An error occurred while getting job details' });
    } catch (error) {
      next(error);
    }
  };

  // This function handles the submission of a resume. It expects a JSON payload with resume data
  static postResume = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resumeData = JSON.parse(req.body.data);
      resumeData.applicantResumePath = req.body.newFileName;
      resumeData.user = parseInt(req.query.userId as string, 10);

      const findResume = await JobRepository.findResume(resumeData.user as number);

      if (findResume) {
        if (resumeData.applicantResumePath === undefined) resumeData.applicantResumePath = findResume.applicantResumePath;

        const updateResume = await JobRepository.updateResume(resumeData.user as number, resumeData);

        // If an error occurs during creating a applicant, return a 500 error.
        if (!updateResume) return res.json({ status: 500, message: 'Error occurred while Updating the Resume' });

      } else {
        const result = await postResumeSchema.validateAsync(resumeData);

        const postResume = await JobRepository.createResume(result);

        // If an error occurs during creating a applicant, return a 500 error.
        if (!postResume) return res.json({ status: 500, message: 'Error occurred while Submitting the Resume' });

      }

      return res.json({ status: 200, message: 'success' }); //success response
    } catch (error) {
      next(error);
    }
  };

  //This function delete the Resume file Name.
  static deleteResumeFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.query.userId as string, 10);
      const deleteFileName = await JobRepository.deleteFileName(userId as number);

      if (deleteFileName) return res.json({ status: 200, message: 'Success' });

    } catch (error) {
      next(error);
    }
  };

  //This function retrieves Resume Data of alumni and friends of the alumni.
  static getResumeData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.query.userId as string, 10);

      const resumeData = await JobRepository.getResume(userId as number);

      if (resumeData) return res.json({ status: 200, data: resumeData });
    } catch (error) {
      next(error);
    }
  };

  static saveJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobId } = req.body;
      const userId = parseInt(req.query.userId as string, 10);

      const checkUser = await JobRepository.checkUser(userId);
      if (!checkUser) {
        await JobRepository.saveJobs(userId, [jobId]); // Convert jobId to array
      } else {
        checkUser.jobId.push(jobId);
        await JobRepository.updateSavedJob(userId, checkUser.jobId);
      }
      res.json({ status: 200, message: 'Saved Successfully' }); // Move this line here
    } catch (error) {
      next(error);
    }
  };


  static getSavedJobData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { globalSearch, page } = req.query;
      const limit = 6;
      const offset = (parseInt(page as string, 10) - 1) * limit;
      const userId = parseInt(req.query.userId as string, 10);
      const checkUser = await JobRepository.checkUser(userId);
      if (checkUser?.jobId) {
        const jobData = await JobRepository.getSavedJobData(globalSearch as string, limit as number, offset as number, checkUser.jobId);
        return res.json({ status: 200, message: 'Data get successfully', data: jobData });
      }
    } catch (error) {
      next(error);
    }
  };

  static unSaveJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobId } = req.body;
      const userId = parseInt(req.query.userId as string, 10);

      const checkUser = await JobRepository.checkUser(userId);
      if (checkUser) {
        checkUser.jobId = checkUser.jobId.filter((job_id) => job_id !== jobId);
        await JobRepository.updateSavedJob(userId, checkUser.jobId);
      }
      res.json({ status: 200, message: 'Unsaved Successfully' });
    } catch (error) {
      next(error);
    }
  };

}