import mongoose  from "mongoose";

const connectDB=async()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("database connected")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/Gocery`)
    }catch(error){

        console.log(error.messsage)
    }
    
}

export default connectDB;