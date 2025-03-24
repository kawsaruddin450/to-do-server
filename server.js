import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";

dotenv.config();
const app = express();

const port = process.env.port || 5000;

//middleware
app.use(express.json());

connectToDB();

app.listen(port, ()=>{
    console.log(`Todo server is running at ${port}.`);
})