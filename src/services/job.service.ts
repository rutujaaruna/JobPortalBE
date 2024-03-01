import { Brackets, DeepPartial } from 'typeorm';
import { Connection } from '../data-source';
import { Job } from '../models/jobs.models';
import { ApplicationStatus, JobApplicant } from '../models/jobApplicants.model';


const jobRepository = Connection.getRepository(Job);
// const jobSeekerRepository = Connection.getRepository(JobSeeker);
const jobApplicantRepository = Connection.getRepository(JobApplicant);

export default class JobRepository {

  // This function creates a new job record in the database.
  static createJob = async(data: Job) => {
    const job = await jobRepository.save(data);
    return job;
  };

  // This function retrieves job details based on a global search string with pagination.
  // It uses search criteria to filter jobs based on skills, job titles, and job locations.
  // It accepts 'globalSearch' as the search string, 'limit' for the number of records per page, and 'offset' for pagination. others
  static getJobDetails = async(globalSearch: string, limit: number, offset: number, userId: number) => {

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
  static getUserAppliedData = async(jobId:number, userId:number) => {
    const user_id = userId;
    console.log('user_id', user_id, jobId);


    const appliedData = await jobApplicantRepository.find({
      where: {
        user: { id: user_id },
        job: { jobId: jobId },
      },
    });
    console.log('appliedData', appliedData);

    return appliedData;
  };

  //This function get the data of job applied and their status
  static getAlumniAppliedJob = async(userId:number, globalSearch:string, limit:number, offset:number) => {
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
  static getJobByUser = async(searchText: string, limit:number, offset:number, userId:number) => {
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

  static updateApplicationStatus = async(status:ApplicationStatus, jobApplicantId:number) => {
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
  static getJobAppliedData = async(job_id:string, searchText:string, limit:number, offset:number) => {

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
}