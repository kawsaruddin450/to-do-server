import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import { Todo } from "./models/todo.model.js";

dotenv.config();
const app = express();

const port = process.env.port || 5000;

//middleware
app.use(express.json());

connectToDB();

app.get("/todos", async(req, res)=> {
    try{
        const result = await Todo.find()
        res.send({
            success: true,
            message: "Todo lists retrieved successfully.",
            data: result,
        })
    }catch{
        res.send({
            success: false,
            message: "Failed to retrieve todo lists.",
        })
    }
})

app.listen(port, ()=>{
    console.log(`Todo server is running at ${port}.`);
})