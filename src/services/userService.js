import { BookShelf } from "../models/book-shelf.js";
import UserRepository from "../repository/user-repository.js";

class UserService{
    constructor(){
        this.userRepository=new UserRepository()
        this.bookShelfRepository=new BookShelf()
    }
    signup=async(data)=>{
        try {
            const user=await this.userRepository.create(data)
            return user
        } catch (error) {
            
        }
    }
}