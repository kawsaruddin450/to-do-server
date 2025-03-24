import express from "express";
const app = express();

const port = process.env.port || 5000;

//middleware
app.use(express.json());

app.get('/', (req, res)=>{
    res.send({
        success: true,
        message: "Server is active.",
    });
})

app.listen(port, ()=>{
    console.log(`Todo server is running at ${port}.`);
})