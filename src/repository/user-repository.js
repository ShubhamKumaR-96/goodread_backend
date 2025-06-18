import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.js";
import ClientError from "../utils/errors/client-error";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository{
    constructor(){
        super(User)
    }

    getUserByEmail=async(userEmail)=>{
        try {
            const user =await User.findOne({
                email:userEmail
            })
            return user
        } catch (error) {
            throw error
        }
    }
    getUserById=async(id)=>{
        try {
           const user=await User.findById(id)
           if(!user){
            throw new ClientError({
                message:"Invalid data sent from the client",
                explanation:"No registered user found for the given email",
            },StatusCodes.NOT_FOUND)
           } 
           return user
        } catch (error) {
            throw error
        }
    }
    
}

export default UserRepository;

