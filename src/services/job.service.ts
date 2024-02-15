import { Connection } from '../data-source';
import { Job } from '../models/jobs.models';


const jobRepository = Connection.getRepository(Job);

export default class JobRepository {

  // This function creates a new job record in the database.
  static createJob = async(data: Job) => {
    const job = await jobRepository.save(data);
    return job;
  };
}