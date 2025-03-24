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

app.post("/create-todo", async(req, res)=> {
    const todoBody = req?.body;
    try{
        const result = await Todo.create(todoBody);
        res.send({
            success: true,
            message: "Todo is created successfully.",
            data: result,
        })
    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: "Failed to create Todo.",
        })
    }
})

app.get("/todos/:todoId", async(req, res)=> {
    const todoId = req.params.todoId;
    try{
        const result = await Todo.findById(todoId);
        res.send({
            success: true,
            message: "Todo is retrieved successfully.",
            data: result,
        })
    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: "Failed to retrieved Todo."
        })
    }
})

app.patch("/:todoId", async(req, res)=>{
    const todoId = req.params.todoId;
    const updatedTodo = req.body;
    try{
        const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
            new: true,
        });
        res.send({
            success: true,
            message: "Todo is updated successfully.",
            data: result
        })
    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: "Failed to update Todo."
        })
    }
})

app.delete("/delete/:todoId", async(req, res)=>{
    const todoId = req.params.todoId;
    try{
        const result = await Todo.findByIdAndDelete(todoId);
        res.send({
            success: true,
            message: "Todo is deleted succesfully.",
            data: result
        })
    }catch(error){
        console.log(error);
        res.send({
            success: false,
            message: "Failed to delete todo",
        })
    }
})

app.listen(port, ()=>{
    console.log(`Todo server is running at ${port}.`);
})