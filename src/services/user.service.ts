import { Connection } from '../data-source';
import { EducationalDetails } from '../models/educationalDetails.model';
import { User } from '../models/user.model';
import { UserDetails } from '../models/userDetails.model';
import { WorkingDetails } from '../models/workExpereience.model';

const userRepository = Connection.getRepository(User);
const userDetailsRepository = Connection.getRepository(UserDetails);
const eduDetailsRepository = Connection.getRepository(EducationalDetails);
const workExpRepository = Connection.getRepository(WorkingDetails);

export default class UserRepository {
  static getProfileData = async(userId: number) => {
    console.log('serviceee', userId);
    const result = await userRepository.createQueryBuilder('user')
      .select([
        'user.firstName',
        'user.lastName',
        'user.role',
        'workingDetails.companyName',
        'workingDetails.designation',
      ])
      .leftJoin('user.workingDetails', 'workingDetails') // Assuming you have a relation named 'batch' in the User entity
      .where('user.id = :userId', { userId })
      .getOne();

    return result;
  };

  static saveUserDetails = async(data:User) => {
    const user = await userRepository.update({ email:data.email }, data);
    return user;
  };

  static updatePersonalDetails = async(data:UserDetails, userId:number) => {
    const user = await userDetailsRepository.update({ user:{ id:userId } }, data);
    return user;
  };

  static savePersonalDetails = async(data:UserDetails) => {
    const user = await userDetailsRepository.save(data);
    return user;
  };

  static getPersonalData = async(id : number) => {
    const userData = await userDetailsRepository.findOne({ where:{ user:{ id:id } } });
    return userData;
  };

  static getEduData = async(id : number) => {
    const userData = await eduDetailsRepository.findOne({ where:{ user:{ id:id } } });
    return userData;
  };

  static saveEduDetails = async(data:UserDetails) => {
    const user = await eduDetailsRepository.save(data);
    return user;
  };

  static updateEduDetails = async(data:UserDetails, userId:number, eduId:number) => {
    const user = await eduDetailsRepository.update({ user:{ id:userId }, eduId:eduId }, data);
    return user;
  };

  static getWorkExpData = async(id : number) => {
    const userData = await workExpRepository.findOne({ where:{ user:{ id:id } } });
    return userData;
  };

  static saveWorkExpDetails = async(data:UserDetails) => {
    const user = await workExpRepository.save(data);
    return user;
  };

  static updateWorkExpDetails = async(data:UserDetails, userId:number, workId:number) => {
    const user = await workExpRepository.update({ user:{ id:userId }, workId:workId }, data);
    return user;
  };

  static getProfileDetails = async(userId:number) => {
    const data = await userRepository.findOne({
      where:{
        id:userId
      },
      relations:{
        workingDetails:true,
        userDetails:true,
        educationalDetails:true
      },
    });
    return data;
  };
}
