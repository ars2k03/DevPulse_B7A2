import express, { type Application, type Request, type Response } from "express";
import authRouter from "./router/server.route";
import dotenv from "dotenv";
dotenv.config();
import { auth } from "./middleware/auth.middle";

const app : Application = express();
const port : number = Number(process.env.PORT);

app.use(express.json());

app.use('/api', authRouter);

app.get('/', (req : Request, res : Response) => {
    res.status(200).json({
        message : "PH Level - 2 Batch - 7",
    })
});

app.get("/protected", auth, (req : Request, res : Response) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
});