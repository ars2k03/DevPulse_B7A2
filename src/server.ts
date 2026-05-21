import express, { type Application } from "express";

const app : Application = express();
const port : number = 8000;

app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
})