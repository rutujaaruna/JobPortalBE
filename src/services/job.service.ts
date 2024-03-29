import { Brackets, DeepPartial } from 'typeorm';
import { Connection } from '../data-source';
import { Job } from '../models/jobs.models';
import { ApplicationStatus, JobApplicant } from '../models/jobApplicants.model';
import { JobSeeker } from '../models/jobSeeker';
import { SaveJobDetails } from '../models/saveJobs.model';
import { In } from 'typeorm';


const jobRepository = Connection.getRepository(Job);
const jobSeekerRepository = Connection.getRepository(JobSeeker);
const jobApplicantRepository = Connection.getRepository(JobApplicant);
const savedJobRepository = Connection.getRepository(SaveJobDetails);

export default class JobRepository {

  // This function creates a new job record in the database.
  static createJob = async (data: Job) => {
    const job = await jobRepository.save(data);
    return job;
  };

  // This function retrieves job details based on a global search string with pagination.
  // It uses search criteria to filter jobs based on skills, job titles, and job locations.
  // It accepts 'globalSearch' as the search string, 'limit' for the number of records per page, and 'offset' for pagination. others
  static getJobDetails = async (globalSearch: string, limit: number, offset: number, userId: number) => {

    // Create a copy of the query builder without the limit and offset
    const countQueryBuilder = jobRepository
      .createQueryBuilder('job')
      .where('job.userId != :user', { user: userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('job.skills LIKE :search', { search: `%${globalSearch}%` })
            .orWhere('job.jobTitle LIKE :search', {
              search: `%${globalSearch}%`,
            })
            .orWhere('job.companyName LIKE :search', {
              search: `%${globalSearch}%`,
            })
            .orWhere('job.jobLocation LIKE :search', {
              search: `%${globalSearch}%`,
            });
        })
      );

    // Execute the count query to get the total count of records
    const total = await countQueryBuilder.getCount();

    // Create the final query with limit and offset
    const jobDetails = await countQueryBuilder
      .limit(limit)
      .offset(offset)
      .getMany();

    return { total, jobDetails };
  };

  // This function retrieves job application data for a specific user and a specific job, based on a reference.
  // It accepts the 'job_id' for the job's ID, 'reference' as the reference value, and 'user_id' for the user's ID.
  static getUserAppliedData = async (jobId: number, userId: number) => {
    const user_id = userId;


    const appliedData = await jobApplicantRepository.find({
      where: {
        user: { id: user_id },
        job: { jobId: jobId },
      },
    });

    return appliedData;
  };

  //This function get the data of job applied and their status
  static getAlumniAppliedJob = async (userId: number, globalSearch: string, limit: number, offset: number) => {
    // Create a copy of the query builder without the limit and offset
    const countQueryBuilder = jobApplicantRepository
      .createQueryBuilder('jobApplicant')
      .where('jobApplicant.user.id = :userId', { userId })
      .leftJoinAndSelect('jobApplicant.job', 'job')
      .andWhere(
        new Brackets((qb) => {
          qb.where('job.skills LIKE :search', { search: `%${globalSearch}%` })
            .orWhere('job.jobTitle LIKE :search', {
              search: `%${globalSearch}%`,
            })
            .orWhere('job.companyName LIKE :search', {
              search: `%${globalSearch}%`,
            })
            .orWhere('job.jobLocation LIKE :search', {
              search: `%${globalSearch}%`,
            });
        })
      );

    // Execute the count query to get the total count of records
    const total = await countQueryBuilder.getCount();

    const JobApplicant = await countQueryBuilder
      .limit(limit)
      .offset(offset)
      .getMany();
    return { JobApplicant, total };
  };

  // This function retrieves job details posted by a specific user based on search criteria, with pagination.
  // It filters jobs based on skills, job titles, job locations, and company names.
  // It accepts 'searchText' as the search string, 'limit' for the number of records per page, and 'offset' for pagination.
  static getJobByUser = async (searchText: string, limit: number, offset: number, userId: number) => {
    const user_id = userId;
    const countQueryBuilder = jobRepository
      .createQueryBuilder('job')
      .where('job.userId = :user', { user: user_id })
      .andWhere(
        new Brackets((qb) => {
          qb.where('job.skills LIKE :search', { search: `%${searchText}%` })
            .orWhere('job.jobTitle LIKE :search', { search: `%${searchText}%` })
            .orWhere('job.jobLocation LIKE :search', {
              search: `%${searchText}%`,
            })
            .orWhere('job.companyName LIKE :search', {
              search: `%${searchText}%`,
            });
        })
      );

    // Execute the count query to get the total count of records
    const totalCount = await countQueryBuilder.getCount();

    // Create the final query with limit and offset
    const jobData = await countQueryBuilder
      .limit(limit)
      .offset(offset)
      .getMany();

    return { totalCount, jobData };
  };

  static updateApplicationStatus = async (status: ApplicationStatus, jobApplicantId: number) => {
    const findData = await jobApplicantRepository.findOneBy({
      jobApplicantId: jobApplicantId,
    });
    if (findData) {
      findData.applicationStatus = status;
      const updateStatus = await jobApplicantRepository.save(findData as DeepPartial<JobApplicant>);
      return updateStatus;
    } else {
      return;
    }
  };

  // This function retrieves job application data based on a specific job ID and search criteria, with pagination.
  // It filters job applications for a particular job based on applicant email, full name, and relevant skills.
  // It accepts 'job_id' as the job's ID, 'searchText' as the search string, 'limit' for the number of records per page,and 'offset' for pagination.
  static getJobAppliedData = async (job_id: string, searchText: string, limit: number, offset: number) => {

    const countQueryBuilder = jobApplicantRepository
      .createQueryBuilder('jobApplicant')
      .where('jobApplicant.jobId = :job', { job: job_id })
      .andWhere(
        new Brackets((qb) => {
          qb.where('jobApplicant.applicantEmail LIKE :search', { search: `%${searchText}%` })
            .orWhere('jobApplicant.applicantFullName LIKE :search', { search: `%${searchText}%` })
            .orWhere('jobApplicant.applicantRelevantSkills LIKE :search', { search: `%${searchText}%` });
        })
      );

    // Execute the count query to get the total count of records
    const total = await countQueryBuilder.getCount();

    // Create the final query with limit and offset
    const jobAppliedData = await countQueryBuilder
      .limit(limit)
      .offset(offset)
      .getMany();

    return { total, jobAppliedData };
  };
  // This function retrieves job seeker data based on a global search string with pagination.
  // It filters job seekers based on their email, full name, and relevant skills.
  // It accepts 'searchText' as the search string, 'limit' for the number of records per page,and 'offset' for pagination.
  static getJobSeekerData = async (searchText: string, limit: number, offset: number, userId: number) => {
    const countQueryBuilder = jobSeekerRepository
      .createQueryBuilder('jobSeeker')
      .leftJoinAndSelect('jobSeeker.user', 'user')
      .where('jobSeeker.userId != :user', { user: userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('jobSeeker.applicantEmail LIKE :search', { search: `%${searchText}%` })
            .orWhere('jobSeeker.applicantFullName LIKE :search', { search: `%${searchText}%` })
            .orWhere('jobSeeker.applicantRelevantSkills LIKE :search', { search: `%${searchText}%` });
        })
      );

    // Execute the count query to get the total count of records
    const total = await countQueryBuilder.getCount();

    // Create the final query with limit and offset
    const jobSeekerData = await countQueryBuilder
      .limit(limit)
      .offset(offset)
      .getMany();

    return { total, jobSeekerData };
  };

  static findResume = async (userId: number) => {
    const resumeData = await jobSeekerRepository.findOneBy(
      {
        user: { id: userId }
      }
    );
    return resumeData;
  };

  static updateResume = async (userId: number, result: JobSeeker) => {
    const updateResumeData = await jobSeekerRepository.update(
      { user: { id: userId } },
      {
        applicantFullName: result.applicantFullName,
        applicantEmail: result.applicantEmail,
        mobileNumber: result.mobileNumber,
        applicantRelevantSkills: result.applicantRelevantSkills,
        designation: result.designation,
        applicantResumePath: result.applicantResumePath,
        user: { id: userId }
      }
    );
    return updateResumeData;
  };

  // This function creates a new resume record in the database.
  // It takes a 'data' object as a parameter, which should contain the job seeker's resume details.
  static createResume = async (data: JobSeeker) => {
    const resume = await jobSeekerRepository.save(data);
    return resume;
  };


  //This function remove the resume File name and make it empty based on userId and reference
  static deleteFileName = async (userId: number) => {
    const resumeDelete = await jobSeekerRepository.findOneBy({
      user: { id: userId }
    });
    if (resumeDelete) resumeDelete.applicantResumePath = '';
    const removeResume = await jobSeekerRepository.save(resumeDelete as DeepPartial<JobSeeker>);
    return removeResume;
  };

  // This function retrieves a user's resume based on their user ID.
  static getResume = async (user_id: number) => {

    const resume = await jobSeekerRepository.findOne({
      where: { user: { id: user_id } },
    });

    return resume;
  };


  static checkUser = async (userId: number) => {
    const userData = await savedJobRepository.findOne({ where: { userId: userId } });
    return userData;
  };

  static saveJobs = async (userId: number, jobId: number[]) => {
    return await savedJobRepository.save({ userId, jobId });
  };

  static updateSavedJob = async (userId: number, jobId: number[]) => {
    return await savedJobRepository.update({ userId: userId }, { jobId: jobId });
  };

  static getSavedJobData = async (searchText: string, limit: number, offset: number, jobId: number[]) => {
    const countQueryBuilder = jobRepository
      .createQueryBuilder('jobRepository')
      .where('jobRepository.jobId IN (:...job)', { job: jobId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('jobRepository.companyName LIKE :search', { search: `%${searchText}%` })
            .orWhere('jobRepository.jobLocation LIKE :search', { search: `%${searchText}%` })
            .orWhere('jobRepository.jobTitle LIKE :search', { search: `%${searchText}%` });
        })
      );

    // Execute the count query to get the total count of records
    const total = await countQueryBuilder.getCount();

    // Create the final query with limit and offset
    const jobSaveddData = await countQueryBuilder
      .limit(limit)
      .offset(offset)
      .getMany();

    return { total, jobSaveddData };
  };



}