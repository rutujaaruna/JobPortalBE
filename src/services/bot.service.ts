import { Connection } from "../data-source";
import { Chatbot } from "../models/chatbot.models";

const Chatbotconnection = Connection.getRepository(Chatbot);

export default class botRepository {
    public static getBotDataByUserInput = async (userInput: string) => {
        
        const result = await Chatbotconnection
            .createQueryBuilder("chatbot")
            .where("chatbot.user_input = :userInput", { userInput })
            .getOne();
        return result;
    };
    
  }