import express, { response } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
const app = express()

dotenv.config()

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to Mongo DB")
       } catch (error){
           throw(error)
       }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB Disconnected");
})
mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected");
})

// Middlewares
app.use("/auth", authRoute);

app.get("/users", (req, res)=>{
    res.send("Hello first request")
})

app.listen(8800, () => {
    connect()
    console.log("Connected to backend!")
})