import express from "express"
import cors from 'cors'
import { PORT } from "./config/serverConfig.js"
import connect from "./config/db-config.js"

const app=express()


// middleware
app.use(cors())
app.use(express.json())




const startServer=()=>{
    app.listen(PORT,async()=>{
        console.log(`Server started at PORT ${PORT}`)
        await connect();
        console.log("Mongo db connected")
    })
}

startServer()

