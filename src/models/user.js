import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { JWT_EXPIRY, JWT_SCERET } from "../config/serverConfig.js";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        lowercase:true,
        uniqueCaseInsensitive:true,
        required:[true,"username required"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index:{
            unique:true
        }
        
    },
      email: {
        type: String,
        lowercase: true,
        uniqueCaseInsensitive: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: {
            unique: true
        },
    },
    password: {
        type: String,
        required: true,
        minLength: [3, 'Password cannot be less than 3 characters']
    }

})

userSchema.pre("save",(next)=>{
    const user=this;
    const SALT=bcrypt.genSaltSync(4)
    const encryptedPassword=bcrypt.hashSync(user.password,SALT)
    user.password=encryptedPassword
    next()
})

userSchema.methods.comparePassword=function compare(password){
    try {
        return bcrypt.compareSync(password,this.password)
    } catch (error) {
        throw error
    }
}
userSchema.methods.generateJWT = function generate() {
    try {
        return jwt.sign({id: this._id, email: this.email}, JWT_SCERET, {
            expiresIn: JWT_EXPIRY
        });
    } catch(error) {
        console.log(error);
        throw error;
    }
    
}

export const User=mongoose.model('User',userSchema)
