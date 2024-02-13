// Import the Connection object for database access
import { Connection } from '../data-source';
import { User } from '../models/user.model';
const userRepository = Connection.getRepository(User);

export default class AuthRepository {
  static getUserByEmail = (email: string) => {
    return userRepository.findOneBy({ email });
  };

  static saveRegisterData = (data: User) => {
    return userRepository.save(data);
  };
}
