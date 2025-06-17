import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

const connect=async()=>{
    await mongoose.connect(DB_URL)
}

export default connect;