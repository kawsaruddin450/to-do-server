import mongoose from "mongoose";

const connectToDB = async ()=>{
    await mongoose.connect(process.env.DB_URI).then((res)=>{
        console.log("MONGODB IS CONNECTED.");
    })
}

export default connectToDB;