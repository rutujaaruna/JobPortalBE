import { Connection } from "../data-source";
import { User } from "../models/user.model";

const Userconnection = Connection.getRepository(User);

export default class userRepository {
  static getProfileData = async (userId: number) => {
    console.log("serviceee", userId);
    const result = await Userconnection.createQueryBuilder("user")
      .select([
        "user.firstName",
        "user.lastName",
        "user.role",
        "workingDetails.companyName",
        "workingDetails.designation",
      ])
      .leftJoin("user.workingDetails", "workingDetails") // Assuming you have a relation named 'batch' in the User entity
      .where("user.id = :userId", { userId })
      .getOne();

    return result;
  };
}
