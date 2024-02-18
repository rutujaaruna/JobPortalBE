import { Connection } from "../data-source";
import { User } from "../models/user.model";

const Userconnection = Connection.getRepository(User);

export default class userRepository {
  static getProfileData = async (userId: number) => {
    console.log("serviceee", userId);
    const result = await Userconnection.createQueryBuilder("user")
      .select([
        "user.firstName as firstName",
        "user.lastName as lastName",
        "user.role as role",
        "workingDetails.companyName as companyName",
        "workingDetails.designation as designation",
      ])
      .leftJoin("user.workingDetails", "workingDetails") // Assuming you have a relation named 'batch' in the User entity
      .where("user.id = :userId", { userId })
      .getRawOne();

    return result;
  };
}
